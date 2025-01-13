
export interface IRegistry {}

export class Registry implements IRegistry {}

// export class PersonRegistry extends Registry {
//     persons: IPerson[]

//     getPersonsByUserNameAndPass(username: string, passwordd: string) {
//         const persons: IPerson[] = []

//         this.persons.forEach((person) => {
//             if (
//                 person.getName() === username &&
//                 person.getPassword() === passwordd
//             ) {
//                 persons.push(person)
//             }
//         })

//         return [...persons]
//     }

//     getPersonsBy(personData: {
//         username: string | undefined
//         password: string | undefined
//         id: string | undefined
//     }) {
//         const { username, password, id } = personData

//         if (
//             username === undefined &&
//             password === undefined &&
//             id === undefined
//         ) {
//             return []
//         }

//         if (
//             username === undefined &&
//             password === undefined &&
//             id !== undefined
//         ) {
//             const persons: IPerson[] = []

//             for (const currentIterPerson of this.persons) {
//                 if (currentIterPerson.getId() === id) {
//                     persons.push(currentIterPerson)
//                 }
//             }

//             return persons
//         }

//         if (
//             username !== undefined &&
//             password === undefined &&
//             id !== undefined
//         ) {
//             return []
//         }

//         return []
//     }

//     checkIfIdExists(newId: string): boolean {
//         for (const person of this.persons) {
//             const id = person.getId()

//             if ((newId = id)) {
//                 return false
//             }
//         }

//         return true
//     }

//     geNerateNewPersonId(): string {
//         let maxIdValue = 0

//         this.persons.forEach((person) => {
//             const passwordAsNumber = Number.parseInt(person.getId())

//             if (passwordAsNumber > maxIdValue) {
//                 maxIdValue = passwordAsNumber
//             }
//         })

//         return (maxIdValue + 1).toLocaleString()
//     }

//     addPerson(person: IPerson): boolean {
//         for (const psn of this.persons) {
//             if (psn === person) {
//                 alert('the Same PErson')
//                 return false
//             }

//             if (psn.getName() === person.getName()) {
//                 alert('the Same Name')
//                 return false
//             }

//             if (psn.getId() === person.getId()) {
//                 const newId = this.geNerateNewPersonId()
//             }
//         }

//         this.persons.push(person)

//         return true
//     }

//     constructor() {
//         super()
//         this.persons = []
//     }
// }
