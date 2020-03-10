module.exports = function ({ interestRepository, validationManager }) {

  return {

    getAllInterests: function (callback) {

      interestRepository.getAllInterests(callback)

    }
    ,

    createInterest: function (interest, callback) {

      const validationErrors = validationManager.validateInterest(interest)

      if (validationErrors.interestError == undefined) {

        interestRepository.createInterest(interest, callback)

      }
      else {

        callback(validationErrors)

      }
    }
    ,

    getInterestsById: function (id_interest1, id_interest2, id_interest3, id_interest4, callback) {

      interestRepository.getInterestsById(id_interest1, id_interest2, id_interest3, id_interest4, callback)

    }
    ,

    filterInterestsById: function (id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback) {

      interestRepository.filterInterestsById(id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback)

    }
  }
}