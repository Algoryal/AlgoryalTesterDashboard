def sheet(data):
	import gspread
	from oauth2client.service_account import ServiceAccountCredentials
	import json

	status_col = []
	time_col = []
	date_col = []
	output_col = []

	sheet_info = {}

	# Get sheet config information
	with open('sheetConfig.json', 'r') as f:
		sheet_info = json.load(f)

	scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
	credentials = ServiceAccountCredentials.from_json_keyfile_name(sheet_info["client_secret_file"], scope)
	client = gspread.authorize(credentials)

	sheet_object = client.open(sheet_info["name"]).sheet1

	row = [
		data['status'],
		data['time'],
		data['date'],
		str(data['output']),
		str(data['number_of_tests'])
	]
	index = len(sheet_object.col_values(1))+1
	sheet_object.insert_row(row, index)

	status_col = sheet_object.col_values(1)
	time_col = sheet_object.col_values(2)
	date_col = sheet_object.col_values(3)
	output_col = sheet_object.col_values(4)
	tests_col = sheet_object.col_values(5)

	return {"status_col": status_col, "time_col": time_col, "date_col": date_col, 'output_col': output_col, "tests_col": tests_col}


def js_config_setup(data):
	import json
	with open('web/config.json', 'w+') as f:
		json.dump(data, f)


def get_and_save_test_result():
	import json
	import datetime

	with open('test.json', 'r') as f:
		data_store = json.load(f)

		status = data_store['status']
		output = data_store['output'][::-1]
		time = data_store['time']
		number_of_tests = data_store['number_of_tests']

	d = datetime.datetime.today()

	cols = sheet({
		"status": status,
		"time": time,
		"date": d.strftime("%d-%B-%Y %H:%M:%S"),
		"output": output,
		"number_of_tests": number_of_tests
	})

	area_labels = []
	for index, status in enumerate(cols["status_col"]):
		area_labels.append("build"+str(index))

	status_percentages = [0, 0, 0]

	successes = 0
	successes_percentage = 0

	warnings = 0
	warnings_percentage = 0

	fails = 0
	fails_percentage = 0

	for status in cols['status_col']:
		if status == 'Successful':
			successes += 1
		elif status == 'Warning':
			warnings += 1
		elif status == 'Failed':
			fails += 1

	# Calculate percentages
	successes_percentage = successes*100/len(cols['status_col'])
	warnings_percentage = warnings * 100 / len(cols['status_col'])
	fails_percentage = fails * 100 / len(cols['status_col'])

	status_percentages[0] = successes_percentage
	status_percentages[1] = warnings_percentage
	status_percentages[2] = fails_percentage

	times = []
	for time in cols["time_col"]:
		times.append(float(time.replace(',', '.')))

	data = {}

	history_area = {"labels": area_labels, "data": times}
	history_pie = {"data": status_percentages}

	data["status"] = status
	data["time"] = time
	data["number_of_tests"] = number_of_tests
	data["date"] = cols["date_col"][-1]
	data["output"] = output[::-1]
	data["history_area"] = history_area
	data["history_pie"] = history_pie
	data["older_outputs"] = cols["output_col"]
	data["status_col"] = cols["status_col"]
	data["time_col"] = cols["time_col"]
	data["date_col"] = cols["date_col"]
	data["output_col"] = cols["output_col"]
	data["tests_col"] = cols["tests_col"]

	js_config_setup(data)


def run():
	import json

	data = {
		"status": 'Running',
		"time": '',
		"output": [],
		"history_area": {"labels": [], "data": []},
		"history_pie": {"data": []},
		"older_outputs": [],
		"status_col": [],
		"time_col": [],
		"date_col": [],
		"output_col": [],
		"tests_col": []
	}
	with open('web/config.json', 'w+') as f:
		json.dump(data, f)

	get_and_save_test_result()
