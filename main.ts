function loading () {
    OLED12864_I2C.circle(
    64,
    32,
    32,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    24,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    16,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    8,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    4,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    2,
    1
    )
    OLED12864_I2C.clear()
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (AnzeigePosition < listId.length - 1) {
        AnzeigePosition += 1
    } else {
        AnzeigePosition = 0
    }
})
function SucheId (Id: number) {
    for (let Index = 0; Index <= listId.length; Index++) {
        if (listId[Index] == Id) {
            return Index
        }
    }
    listId.push(Id)
    listGehenZeit.push("0")
    listKommenZeit.push("0")
    return listId.length - 1
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (AnzeigePosition == 0) {
        AnzeigePosition = listId.length - 1
    } else {
        AnzeigePosition += -1
    }
})
function OLED () {
    OLED12864_I2C.showString(
    3,
    1,
    "Id:" + listId[AnzeigePosition],
    1
    )
    OLED12864_I2C.showString(
    3,
    2,
    "K:" + listKommenZeit[AnzeigePosition],
    1
    )
    OLED12864_I2C.showString(
    3,
    3,
    "G:" + listGehenZeit[AnzeigePosition],
    1
    )
    OLED12864_I2C.showString(
    3,
    5,
    "AnzahlIdInListe:" + listId.length,
    1
    )
    OLED12864_I2C.showString(
    3,
    6,
    "AnzeigePosition:" + AnzeigePosition,
    1
    )
}
let IdPosition = 0
let Id = 0
let Datum = ""
let Uhrzeit = ""
let AnzeigePosition = 0
let listId: number[] = []
let listKommenZeit: string[] = []
let listGehenZeit: string[] = []
listGehenZeit = []
listKommenZeit = []
listId = []
AnzeigePosition = 0
OLED12864_I2C.init(60)
OLED12864_I2C.zoom(false)
OLED12864_I2C.invert(true)
MFRC522.Init(
DigitalPin.C9,
DigitalPin.C8,
DigitalPin.C7,
DigitalPin.P0
)
loading()
basic.forever(function () {
    Uhrzeit = PCF85063TP.getTime()
    Datum = PCF85063TP.getDate()
    Id = MFRC522.testID()
    if (Id != 0) {
        IdPosition = SucheId(Id)
        if (listKommenZeit[IdPosition] == "0" || listGehenZeit[IdPosition] != "0") {
            listKommenZeit[IdPosition] = "" + Datum + ":" + Uhrzeit
        }
    }
    OLED()
})
