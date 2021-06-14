import { createNote } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'

renderNotes()

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = createNote()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        renderNotes()
    }
})

// document is an object to perform all DOM manipulations
// querySelector() is a method to look for whats in the ()

// p.textContent = get the text and console log / change / whatever
// p.remove() = remove

// the agrument in the function of the addEventListener() represent the event
// target: the element of the event which was fred on, this helps us manipulate stuff

// #: targeting with element id
// . for class

// p#oreder