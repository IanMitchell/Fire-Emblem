# Fire Emblem Support Tool

This isn't the most useful tool. Basically I'm using it to play around with some web technologies, most notably [React](http://facebook.github.io/react/). For those of you that play [Fire Emblem: Awakening](http://fireemblem.nintendo.com) on the 3DS, this tool lets you click through different support levels and view the effects on the children. Nothing you can't find out by going to the wiki, but in a more interactive format. I'm also using [localforage](https://github.com/mozilla/localForage) to persist your choices across sessions.

## Status

The application is done and 'working', but the data isn't in. At this point, I've decided to stop working on it for a few reasons:

1. It was meant to be a project to learn technologies, not to be released
2. Not all the required information is available ([Kjelle Growth Rates](http://fireemblem.wikia.com/wiki/Kjelle))
3. Morgan's stats would be super annoying to code, since the Avatar can be male or female
4. I really just don't have the time to edit a ~1,000 line JSON file by hand
5. Fire Emblem: Awakening is an old game

That said, the support choice table and child hooks all work well enough. If you for whatever reason would like to see the tool finished, all that needs to be done is finishing the `resources/children.json` file.

Most likely I'll revisit this project once the new Fire Emblem game is launched, and update it to work with that game.
