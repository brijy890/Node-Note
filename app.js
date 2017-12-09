const fs = require('fs');
const os = require('os');
const yargs = require('yargs');

const notes = require('./note.js');

const argv = yargs
	.command('add', 'Add a new note', {
		title: {
			describe: 'Title of note',
			demand: true,
			alias: 't'
		},
		body: {
			describe: 'Body of the note',
			demand: true,
			alias: 'b'
		}
	})
	.help()
	.argv;
var command = process.argv[2];


if (command === 'list') {
	var AllNotes = notes.getAll();
	console.log(`Printing ${AllNotes.length} note(s)`);
	AllNotes.forEach((note) => notes.logNote(note));
} else if(command === 'add') {
	var note = notes.addNote(argv.title, argv.body);
	if(note){
		console.log('Note created');
		notes.logNote(note);
	} else{
		console.log("Title taken");
	}
} else if(command === 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed' : 'Note not found';
	console.log(message);
} else if(command == 'read'){
	var note = notes.readNote(argv.title);
	if(note){
		console.log("Note found");
		notes.logNote(note);
	} else{
		console.log("Note not found");
	}
}
// console.log(process.argv);