radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        Action = 3
    } else if (receivedNumber == 1) {
        Action = 4
    }
})
input.onButtonPressed(Button.A, function () {
    if (Manual == 0) {
        Manual = 1
        FW_Speed = 80
        BW_Speed = -80
    } else {
        Manual = 0
        FW_Speed = 80
        BW_Speed = -80
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Gear") {
        if (Gear == 0) {
            FW_Speed = 120
            BW_Speed = -120
            Gear = 1
        } else if (Gear == 1) {
            FW_Speed = 160
            BW_Speed = -160
            Gear = 2
        } else if (Gear == 2) {
            FW_Speed = 80
            BW_Speed = -80
            Gear = 0
        }
    }
    if (receivedString == "Honk") {
        music.playTone(988, music.beat(BeatFraction.Half))
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "Start") {
        if (value == 1) {
            Action = 1
        } else if (value == 0) {
            Action = 0
        } else {
            Action = 2
        }
    }
})
let BW_Speed = 0
let FW_Speed = 0
let Manual = 0
let Gear = 0
let Action = 0
radio.setGroup(1)
Action = 0
Gear = 1
Manual = 0
FW_Speed = 80
BW_Speed = -80
pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
basic.forever(function () {
    if (Manual == 1) {
        if (Action == 0) {
            robotbit.MotorStopAll()
        } else if (Action == 1) {
            robotbit.MotorRun(robotbit.Motors.M1A, FW_Speed)
            robotbit.MotorRun(robotbit.Motors.M2A, FW_Speed)
        } else if (Action == 2) {
            robotbit.MotorRun(robotbit.Motors.M1A, BW_Speed)
            robotbit.MotorRun(robotbit.Motors.M2A, BW_Speed)
        } else if (Action == 3) {
            robotbit.MotorRun(robotbit.Motors.M1A, 0)
            robotbit.MotorRun(robotbit.Motors.M2A, FW_Speed)
        } else if (Action == 4) {
            robotbit.MotorRun(robotbit.Motors.M1A, FW_Speed)
            robotbit.MotorRun(robotbit.Motors.M2A, 0)
        }
    }
})
basic.forever(function () {
    if (Manual == 0) {
        if (sonar.ping(
        DigitalPin.P13,
        DigitalPin.P14,
        PingUnit.Centimeters
        ) > 3) {
            if (pins.digitalReadPin(DigitalPin.P12) == 1) {
                robotbit.MotorRun(robotbit.Motors.M1A, 0)
            } else {
                robotbit.MotorRun(robotbit.Motors.M1A, 80)
            }
            if (pins.digitalReadPin(DigitalPin.P13) == 1) {
                robotbit.MotorRun(robotbit.Motors.M2A, 0)
            } else {
                robotbit.MotorRun(robotbit.Motors.M2A, 80)
            }
        } else {
            robotbit.MotorRun(robotbit.Motors.M1A, 0)
            robotbit.MotorRun(robotbit.Motors.M2A, 0)
        }
    }
})
