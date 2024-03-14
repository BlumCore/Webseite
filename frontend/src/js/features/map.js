const ch = document.querySelector(".map__ch")
const fr = document.querySelector(".map__fr")
const it = document.querySelector(".map__it")

const chtext = document.querySelector(".map__ch--races")
const frtext = document.querySelector(".map__fr--races")
const ittext = document.querySelector(".map__it--races")

ch.addEventListener("click", () => {
    removeClass()
    ch.classList.add("map__clicked")
    chtext.classList.add("map__display")

})
fr.addEventListener("click", () => {
    removeClass()
    fr.classList.add("map__clicked")
    frtext.classList.add("map__display")

})
it.addEventListener("click", () => {
    removeClass()
    it.classList.add("map__clicked")
    ittext.classList.add("map__display")

})

function removeClass(){
    ch.classList.remove("map__clicked")
    fr.classList.remove("map__clicked")
    it.classList.remove("map__clicked")

    chtext.classList.remove("map__display")
    frtext.classList.remove("map__display")
    ittext.classList.remove("map__display")
}
