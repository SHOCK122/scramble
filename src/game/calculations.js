const calcRevealed = (tileset, letter) => {
    let totalRevealed = 0
    if (typeof letter !== 'undefined') {
        return tileset[letter].revealed
    }
    for (const tile in tileset) {
        totalRevealed += tileset[tile].revealed
    }
    return totalRevealed
}

export default calcRevealed