#  ******** StreamCar ********
# Wykorzystanie
## 1. API
### Użytkownicy
#### Lista użytkowników
`/user/`
#### Dodawanie
`/user/create?name=nazwa&email=test@tes.pl&password=test`
#### Usuwanie
`/user/destroy/:id`
#### Edytowanie
`/user/update/:id?name=inna_nazwa`
#### Logowanie
`/login`
- dane (PUT):
  - email: `email`
  - pass: `hasło`
- response:
  - błędne dane: `header: 404`
  - błąd serwer: `header: 500`
  - poprawnie zalogowany: `header: 200`

## 2. Sockety
### Auto

#### Ustawienie pinów (Oczekuję)
- nazwa zdarzenia: `setPins`
- dane: `brak`

#### Poruszanie (Oczekuję)
- nazwa zdarzenia: `move`
- dane:
```
{
  direction: "left", // albo "right"
  degree: 50, // stopień obrotu
  power: 100 // w procentach, do przodu na plusie, na minusie do tyłu
}
```

#### Przeszkoda (Emituję)
Emituję zdarzenie tylko raz gdy odległość jest mniejsza niż 100 cm:
- nazwa zdarzenia: `colisionDetect`
- dane:
```
{
  distance: 20 // odległość do przeszkody w cm
}
```

#### Wyłączenie czujnika odległości (Oczekuję)
- nazwa zdarzenia: `turnOffSensor`
- dane:
```
{
  sensor: "distance" // albo "beacons"
}
```

#### Włączenia czujnika odległości (Oczekuję)
- nazwa zdarzenia: `turnOnSensor`
- dane:
```
{
  sensor: "distance" // albo "beacons"
}
```

#### Znaleziony beacon (Emituję)
- nazwa zdarzenia: `scanBeacon`
- dane:
```
{
  beacon: // informacje o urządzeniu
}
```

#### Włączenia swiatel
- nazwa zdarzenia: `lightOn`
- dane: `brak`

#### Wyłączenie swiatel
- nazwa zdarzenia: `lightOff`
- dane: `brak`

#### Odbieranie rtsp
```
client = new Websocket('ws://localhost:9999');
player = new jsmpeg(client, {
    canvas: canvas // Canvas should be a canvas DOM element
});
```
