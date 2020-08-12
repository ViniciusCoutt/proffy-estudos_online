const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Fisica",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// Funcionalidades

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(":") // Aqui estamos separando hour e minutes em duas variaveis ([] = desestruturação)), e o time split nos possibilita colocar duas variaveis em volta de ":".
    return Number ((hour * 60) + minutes)
}
module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}