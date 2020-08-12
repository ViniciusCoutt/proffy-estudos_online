const Database = require('./database/db')

const {subjects, weekdays, getSubject, convertHoursToMinutes} = require('./utils/format') // (Desestruturar) - Pegar do format.js o objeto inteiro

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time) // O sinal de exclamação é negação(not) e as duas barras é ou (or), ou seja, nessa linha, a gnt permanece na página se ainda houver campos vazios. Se todos os campos forem preenchidos a pagina carrega sem parar(não tem pagina de destino)) 
    {
        return res.render("study.html", {filters, subjects, weekdays})
    }
    
    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)


    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > "${timeToMinutes}"
        )  
            AND classes.subject = '${filters.subject}'
    `

    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database // conexão com o banco de dados
        const proffys = await db.all(query) // conexão com o banco de dados

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', {proffys, subjects, filters, weekdays})
    } catch (error) {
        console.log(error)
    } // caso haja erro (try), pega-lo (cath) e coloca-lo no log

}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", {subjects, weekdays})
}
async function saveClasses(req,res){
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.avatar,
        bio:  req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }


    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }


}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}