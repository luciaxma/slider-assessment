/**
 * Function to get an array of necessary clones along with the original data
 * This is to enable looping through the slider
 */
export const getDataWithClones = ({ data, show }) => {

  // Mobile
  // Since there is only 1 slide showing at any given time, there only needs to be two clones
  if (show === 1) {
    const dataWithClones = [...data];

    // Get clone of first item and last item
    const firstClone = {...data[0]};
    const lastClone = {...data[data.length-1]};

    // Add cloned items to first and last position in array
    dataWithClones.unshift(lastClone);
    dataWithClones.push(firstClone);

    // Change ids to differenciate between actual items vs clones
    // Append "c" to existing id
    dataWithClones[0].id = `${dataWithClones[0].id}c`;
    dataWithClones[dataWithClones.length-1].id = `${dataWithClones[dataWithClones.length-1].id}c`;

    return ({
      dataWithClones,
      currentIndex: 1, // Starting index of original array
      length: dataWithClones.length
    })
  }

  // Desktop
  // More clones are needed for showing 3 slides at once due to permutations
  // 13 clones are needed [6 clones, 5 original, 7 clones]
  else if (show === 3) {

    // Get first clone needed
    const firstClone = {...data[data.length-1], id: `${data[data.length-1].id}ccc` };

    const firstSetOfClones = data.map(item => {
      return ({...item, id: `${item.id}c`});
    })

    const secondSetOfClones = data.map(item => {
      return ({...item, id: `${item.id}cc`});
    })

    const secondToLastClone = {...data[0], id: `${data[0].id}ccc` };
    const lastClone = {...data[1], id: `${data[1].id}ccc` };

    const dataWithClones = [firstClone, ...firstSetOfClones, ...data, ...secondSetOfClones, secondToLastClone, lastClone];

    return ({
      dataWithClones,
      currentIndex: 6, // Starting index of original array
      length: dataWithClones.length
    })
  }
}