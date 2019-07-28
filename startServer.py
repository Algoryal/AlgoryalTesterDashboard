import os
import json

data = {
	"status": "",
	"time": "",
	"output": [],
	"history_area": {
		"labels": [],
		"data": []
	},
	"history_pie": {
		"data": []
	},
	"older_outputs": []
}
os.chdir('web')
with open('config.json', 'w+') as f:
	json.dump(data, f)
os.system('npm run start')