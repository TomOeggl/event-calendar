# Coding Challenge: Sport events calendar

### Stack: ReactJS + Tailwind CSS

## Goals:

1. Coding Exercise:

The goal is to implement a calendar for sport events. Events may be added to the calendar.
Examples:
- Sat., 18.07.2022, 18:30, Football, Salzburg – Sturm
- Sun., 23.10.2022, 09:45, Ice Hockey, KAC – Capitals

2. Detail Page, Overview:

Take the data out of the JSON you got in the E-Mail and display it in an overview of all events.
Also provide an option to show the whole information of one event in a detail page.

3. Add Event:

The possibility to add an event on runtime should be given. It is not needed to save the data
somewhere.

4. Responsiveness:

The site should be fully responsive on mobile and tablet

5. Navigation:

Create a rudimentary navigation to switch between overview and the add event page

## Approach

Decided for a SPA, high contrast between navigation/header and content in ui design and and minimalistic, but comprehensive and (hopefully) effective interaction and data displaying possibilties. The page is broken down into self contained react elements with readability prioritized. Global data conversion and formatting functions have there own place in the utils directory, global style classes are defined in index.css.

### Screenshots of final result

![mobile view example](./public/readmeImages/mobile.png)
![mobile view valdation at work example](./public/readmeImages/validations-mobile.png)
![tablet view example](./public/readmeImages/tablet.png)
![view example on big screens](./public/readmeImages/big-screen.png)
