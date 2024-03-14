export enum PersonQuery {
    GET_PERSON = `{
        allPeople {
            people {
              birthYear
              created
              edited
              eyeColor
              gender
              hairColor
              height
              name
            }
          }
      }
    `,
  }