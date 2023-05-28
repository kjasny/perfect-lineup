const validateLineup = (array) => {
  let lineup = structuredClone(array)

  if (lineupSalary(lineup) > 45000) {
    return false
  } if (!lineupGameID(lineup)) {
    return false
  } if (!lineupTeamID(lineup)) {
    return false
  } if (!lineupPosition(lineup)) {
    return false
  } else return true
}

const lineupSalary = (lineup) => {
  const totalSalary = lineup.reduce((accumulator, currentPlayer) => {
    accumulator = accumulator + currentPlayer.salary

    return accumulator }, 0)

  return totalSalary
}

const lineupGameID = (lineup) => {
  let gameIDLineup = lineup.reduce((accumulator, currentPlayer) => {
    if (!accumulator.find(thisItem => thisItem.gameId === currentPlayer.gameId)) {
      accumulator.push({ gameId: currentPlayer.gameId, totalGames: 1 })
    } else {
      let existingGame = accumulator.find(thisItem => thisItem.gameId === currentPlayer.gameId)

      existingGame.totalGames = existingGame.totalGames + 1
    }

    return accumulator
  }, []).filter((currentGame) => currentGame.totalGames > 3)

  if (gameIDLineup.length > 0) {
    return false
  } else {
    return true
  }
}

const lineupTeamID = (lineup) => {
  let teamIDLineup = lineup.reduce((accumulator, currentPlayer) => {
    if (!accumulator.find(thisItem => thisItem.teamId === currentPlayer.teamId)) {
      accumulator.push({ teamId: currentPlayer.teamId, totalTeams: 1 })
    } else {
      let existingTeam = accumulator.find(thisItem => thisItem.teamId === currentPlayer.teamId)

      existingTeam.totalTeams = existingTeam.totalTeams + 1
    }

    return accumulator
  }, []).filter((currentGame) => currentGame.totalTeams > 2)

  if (teamIDLineup.length > 0) {
    return false
  } else {
    return true
  }
}

const lineupPosition = (lineup) => {
  let positionLineup = lineup.reduce((accumulator, currentPlayer) => {
    if (!accumulator.find(thisItem => thisItem.position === currentPlayer.position)) {
      accumulator.push({ position: currentPlayer.position, positionTotal: 1 })
    } else {
      let existingPosition = accumulator.find(thisItem => thisItem.position === currentPlayer.position)

      existingPosition.positionTotal = existingPosition.positionTotal + 1
    }

    return accumulator
  }, [])

  for (let i = 0; i < positionLineup.length; i++) {
    let currentPosition = positionLineup[i]

    if (currentPosition.position !== 'OF' && currentPosition.positionTotal > 1) {
      return false
    } if (currentPosition.position === 'OF' && currentPosition.positionTotal !== 3) {
      return false
    } if (positionLineup.length !== 7) {
      return false
    }
  }

  return true
}


module.exports = validateLineup
