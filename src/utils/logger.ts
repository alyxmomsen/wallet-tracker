export function loggerCreator(
    isOn: boolean,
    titleValue: string = 'unnamed log'
) {
    const title = titleValue

    return (data: string) => {
        if (isOn) {
            console.log(`>>> ${title} >>> ${data}`)
        }
    }
}
