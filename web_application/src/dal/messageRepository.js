module.exports = function ({ db }) {

	return {

		createMessage: function (message, profile_id, callback) {

			const query = `insert into myDB.profilemessages(message, profile_id) values(?,?)`
			const values = [message, profile_id]

			db.query(query, values, function (error) {

				if (error) {

					callback(['You have already created a message. If you want to change message go to update message.'])

				}
				else {

					callback(null)

				}
			})
		}
		,

		getMessageByProfileId: function (profile_id, callback) {

			const query = `SELECT message FROM myDB.profilemessages WHERE profile_id = ?`
			const value = profile_id

			db.query(query, value, function (error, message) {

				if (error) {

					callback(['databaseError'], null)

				}
				else {

					if (message.length == 0) {

						callback(null, null)

					}
					else {

						callback(null, message[0].message)

					}
				}
			})
		}
		,

		deleteMessageByProfileId: function (id, callback) {

			const query = 'DELETE FROM myDB.profilemessages WHERE profile_id = ?'
			const values = [id]

			db.query(query, values, function (error) {

				if (error) {

					callback(['Could not delete Message.'])

				}
				else {

					callback(null)

				}
			})
		}
		,

		updateMessageByProfileId: function (message, profile_id, callback) {

			const query = 'UPDATE myDB.profilemessages SET message = ? WHERE profile_id = ?'
			const values = [message, profile_id]

			db.query(query, values, function (error) {

				if (error) {

					callback(['Could not update message.'])

				}
				else {

					callback(null)

				}
			})
		}
	}
}