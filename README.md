# AlgoryalTesterDashboard
A web dashboard for the AlgoryalTester library. This dashboard serves as a web-interface for your testing with AlgoryalTester.

# Get started

To create a project that uses the AlgoryalTesterDashboard follow these steps.

### Setup
0. Clone this repository (https://github.com/Algoryal/AlgoryalTesterDashboard.git).
1. Reneame the folder to your project's name, and navigate into the folder.
2. Add your source files (your python code).
3. Clone AlgoryalTester from GitHub (https://github.com/Algoryal/AlgoryalTester.git)

### Create tests
0. Create a new python file, you can call it whatever you want but we recommend this naming style: _test_[name_of_file_you_are_testing.].py_
- Open the file and input the following:

```python
from AlgoryalTester import algoryaltester
import dashboard
import [the_file_you_are_testing]
```

- You can now create your first test (assertEquals is currently the only testing supported).
#### here is an example of a test testing a method called *math* that takes in two integers and returns them added together
main.py (The file being tested)
```python
def math(num1, num2):
  return num1+num2
```
test_main.py (The test)

```python
from AlgoryalTester import algoryaltester
import dashboard
import main

algoryaltester.assertEquals(main.math(1, 2), 3)
```

This test will be successful scince 1+2 = 3 is True.
if you want to see more information about the test add this line at the end of your test

```python
algoryaltester.results(True)
```
the boolian (True) getting passed in tells AlgoryalTester to write the test result(s) to a file called test.json, this file will be used by the dashboard later-on. You can pass in false if you don't want to write to test.json but then the dashboard won't work.

- If you now run your test file, you'll se some output in your console but nothing else will happen. (If you passed in True to results() you should now see a new file called test.json, you can open it if you want to ;)

### Running the dashboard
You have now created a project and created your AlgoryalTester test. You are now ready to set up and start using the dashboard.

#### Setting up Google Sheets
You will have to create a google spreadsheet and set up the google drive api to use the Dashboard

0. Create a new google drive spreadsheet.
1. Go to the Google APIs Console.
2. Create a new project.
3. Click Enable API. Search for and enable the Google Drive API.
4. Create credentials for a Web Server to access Application Data.
5. Name the service account and grant it a Project Role of Editor.
6. Download the JSON file.
7. Copy the JSON file to your project directory and rename it to client_secret.json

- Next find the  client_email inside client_secret.json. Back in your spreadsheet, click the Share button in the top right, and paste the client email into the People field to give it edit rights. Hit Send.
If you skip this step, you’ll get a gspread.exceptions.SpreadsheetNotFound error.

- Now open the file called "sheetConfig.json".
Change "TestingData" to what you called your spreadsheet.
Save and close the file.

#### Setting up the dashboard

- Open the web folder navigate to js and open "main.js". 
Modify project ("Default is "Project Name") to your project's name and paste in the link to your spreadsheet in between the sheetLink quotes. 
Save and close the file.

- Go back to you project's root folder.
- Open a terminal window and type in (Use python3 if you have multiple python versions):
```bash
pip3 install gspread
pip3 install oauth2client
```
- Run the dashboard
```bash
python3 startServer.py
```

Wait for a moment and your browser should open a load the dashboard on localhost:3000
There is no data in the dashboard yet.

- Open your test_[name].py file and add this line to the bottom

```python
dashboard.run()
```
Save and close.

- Open a new terminal window (Kepping the one with the server running open)
and run your test.

```bash
python3 test_[name].py
```

Now switch back to your browser and you should see a message on the dashboard, with the text "Running Tests", you can also check your spreadsheet and make sure that your test data is there. If it doesn't work go back to your console and check for error messages.

And that's it! You have now successfuly set up AlgoraylTester & AlgoryalTesterDashboard
