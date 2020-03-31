# Build and Run Application
- To use our application download the files from github under Maintenance-Ticket-Software and use visual studio code to open it (branch 1 will be for iteration 1). 
- The front end can be run by executing the command `npm start` in the terminal of the client folder.
- The Back end can be run by executing `node server` in another shell from the project folder. To run our database, download mongodb and type “mongod”.

# Running Tests
- To run the front end test cd into client folder and run `npm test`
- To run the back end test run `npm run backend-tests`

# Common `git` commands

## clone
```sh
$ git clone https://github.com/AustenBaker/Maintenance-Ticket-Software.git
```

## local
```sh
$ git stash # save all changes to local cache, reset to unedited form
$ git stash pop # restore all changes to local cache, overwrite
```

## commit workflow

* First commit locally. I recommend that everyone commits often
```sh
$ git add <files>
$ git commit -m "<msg>"
```
  - If you have any changes to the previous commit
     ```sh
     $ git add <changed_files>
     $ git commit --amend -m "<new_msg>"
     ##### OR #####
     $ git commit --amend --no-edit # If you don't need to change the last commit message
     ```


 * Before pushing, be sure to pull all changes from upstream
 ```sh
 $ git pull --rebase
 ```
  - If there are errors, the local commit has conflicts with upstream
    ```sh
    $ git status # Check conflicting files
    $ git add <fixed_files>
    $ git rebase --continue
    ```

  - Conflicting files demo: select and save the content within one of `<<<<<` `=====` and `=====` `>>>>>`
    ```java
    <<<<<<< HEAD:master
    int num = 3;  // Either only keep this line
    =======
    int num = CONSTANT;  // or this line
    >>>>>>> 4e2b407f501b68f8588aa645acafffa0224b9b78:master
    ```

* Push normally
```sh
$ git push[ origin head]
```

## TL;DR
1. #### **Try not to use `git pull`，Use `git pull --rebase` most of the time**
1. If someone just pushed, and you don't have a commit yet, but would still like to apply their changes, you can:
```sh
$ git stash
$ git git pull
$ git stash pop
```
