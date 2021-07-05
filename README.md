# test-bot
This is the bot that I test everything on.
# Current Issues
 - ~~Need to fix the permissions system so that it works per-command and gives an error if the user does not have the perms or the bot doesn't have the perms.~~ Fixed. Just gotta move over to Sakura Moon.
# Currently Adding...
Audit Logs
 - Add the list to the database for the events we can enable/disable.
 - decide: Separate command for each event for on/off and then another for all or 1 command that uses args and idenfies messages from the args.
 - logging everything (memberAdd, memberDelete, banAdd, banDelete, etc.) in the events folder.
 - invite logs, join logs, etc.
    - code for this was shared with me. Just need to include an on/off for that like below.
 - ability to turn on/off each type of log for unique per-guild logging.
    - I just need to update the db for each type of option (I guess a new column for each type 0 for off 1 for on.)
