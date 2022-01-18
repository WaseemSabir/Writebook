# Writebook
Writebook is application that makes it easier for you to write documents. The documents have section, subsection hiearchy and can be edited, shared and downloaded with an intuitive user interfece. 

## Getting Started
WriteBook is built with angular and django rest framework and has basic dependencies of [node](https://nodejs.org/en/), npm, [python](https://www.python.org/) and pip. After you have those dependencies  installed, open the terminal and run following commands to get started.

```bash
git clone https://github.com/WaseemSabir/Writebook.git # or you can unzip the code
cd WriteBook # skip if terminal opened inside project folder
```

create an python enviorment and install server dependencies and run server:
```bash
python3 -m venv env
source env/bin/activate # for linux based machine
cd serverApp
pip install -r requirements.txt
python3 manage.py runserver
```
This will start a server at http://127.0.0.1:8000/ that will be used for API calls.

To serve the application, you will need angular cli that you can install with following command:
```bash
npm install -g @angular/cli
```

go back to project folder (in terminal with `cd ..` ), and run following commands to start the client application.
```bash
cd clientApp
npm install
ng serve
```

This will start a server at http://localhost:4200, go to the url to use the application.

You can create a new account or use following credentials that has some documents added already.
Username: `squibler`
Password: `squibler@1122`