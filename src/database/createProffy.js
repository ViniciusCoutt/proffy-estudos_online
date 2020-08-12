module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) { // Importando uma função que irá precisar do banco de dados (db) e desses três objetos seguintes 
    //1. INSERINDO DADOS  NA TABELA TEACHERS. O await serve esperar nessa linha, até que a informação de cadastro seja enviada / garante que será executado, se receber a informação. (Precisa que na frente da função tenha (async), ficando assim: (= async function). E precisamos do id do proffy, por isso o insertedProffy, se não precisasse não precisaria por
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
                name, 
                avatar,
                whatsapp,
                bio
            ) VALUES (
                "${proffyValue.name}",
                "${proffyValue.avatar}",
                "${proffyValue.whatsapp}",
                "${proffyValue.bio}" 
            );
    `) 
    // Usamos o VALUE para inserir valores e usamos o ${} para inserir variaveis dentro do texto
    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
                subject, 
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
`) 

    const class_id = insertedClass.lastID

    // Inserir dados na tabela class_schedule. Por ser um array, ao colocarmos um ponto, podemos colocar muitas propriedades e funcionalidades nele. Ao fazer o retorno, o map consegue agrupar em um novo array, se o array tem dois elementos, ele vai rodar e colocar em um, e assim para o segundo, quantas vezes forem necessárias
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );  
        `)
    })

    //aqui vou executar todos os db.runs() das class_schedules. O promise all(), dentro do parentese consegue executar um array de muitas promessas. Que seria o: insertAllclassScheduleValues
    await Promise.all(insertedAllClassScheduleValues)
}
