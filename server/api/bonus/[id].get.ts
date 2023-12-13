export default defineEventHandler(async (event) => {
    try {

        const studentNumber: string | undefined = getRouterParam(event, 'id')

        // Make sure the student number is provided
        if (studentNumber === undefined) {
           
            throw createError({
                statusCode: 404,
                statusMessage: 'No student number provided'
              })
            
        }

        // Convert the student number to a number
        const studentNumberInt = parseInt(studentNumber);

        // Make sure the student number is a number
        if (isNaN(studentNumberInt)) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Student number must be a number'
            })
        }

        // Try to find the student
        const student = await StudentSchema.findOne({ id: studentNumberInt });

        if (student === null) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Student not found'
            })
        }

        // Check if the Bonus has already been claimed by the user 
        const bonusOnServer = await BonusSchema.findOneAndUpdate({ id: studentNumberInt }, { date: new Date()});

        if (bonusOnServer !== null) {
            // Return a message to the user saying the bonus has been claimed 
            return {
                message: `Hello, ${student.firstName}! You only get one! We have already recorded your bonus.`
            }
        }
        
        // We want to create a bonus entry for this student in the database
        const bonus = new BonusSchema({ id: studentNumberInt, date: new Date() });

        // Save the bonus entry to the database
        await bonus.save();

        // Return a message to the user
        return {
            message: `Hello, ${student.firstName}! Congratulations. We have recorded your bonus!`
        }


        // const student = await StudentSchema.findOne({ id: 55}); 

        // return await StudentSchema.find({})
    }
    catch (error) {
      return error
    }
  })