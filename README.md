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
## 2. Sockety
### Auto
Pierwsze co musisz zrobić to wysłać zdarzenie `setPins` bez żadnych danych, następnie będziesz mógł wysyłać zdarzenie poruszania
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
#### Czujnik Odległości (Emituję)
Emituję zdarzenie tylko raz gdy odległość jest mniejsza niż 100 cm:
- nazwa zdarzenia: `obstacle`
- dane:
```
{
  distance: 20 // odległość do najlbiższej przeszkody w cm
}
```
