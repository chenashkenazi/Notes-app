import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

// read existing notes from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

// save the notes to local storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// expose notes from module
const getNotes = () => notes

const createNote = () => {
    const id = uuidv4();
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body:'',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes()

    return id
}

// remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if(noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// sort notes by one of three ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((item1, item2) => {
            if(item1.updatedAt > item2.updatedAt) {
                return -1
            } else if (item1.updatedAt < item2.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((item1, item2) => {
            if(item1.createdAt > item2.createdAt) {
                return -1
            } else if (item1.createdAt < item2.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((item1, item2) => {
            if(item1.title.toLowerCase() < item2.title.toLowerCase()) {
                return -1
            } else if (item1.title.toLowerCase() > item2.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
}

const updateNotes = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if ( typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNotes }