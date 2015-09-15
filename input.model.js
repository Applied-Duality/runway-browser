param ELEVATORS: 1..1024 = 6;
param PEOPLE: 1..(ELEVATORS*100) = 100;
param FLOORS: 2..1000 = 10;

type ElevatorId: 1..ELEVATORS;
type Floor: 1..FLOORS;

// How long the doors stay open
distribution openTime() -> Time {
    return 3s;
}

// How long the doors take to open or close
distribution doorTime() -> Time {
    return 1s;
}

distribution makeDestination(start: Floor) -> Floor {
    return start;
}

type Person: node {
    state: either {
        Sleeping {
            floor: Floor,
        },
        Waiting {
            floor: Floor,
            destination: Floor,
        },
        Riding {
            elevator: ElevatorId,
            destination: Floor,
        },
    },
}

type FloorControl: node {
    downActive: Boolean,
    upActive: Boolean
}

type Elevator: node {
    destinations: Set<Floor>,
    riders: Set<PersonId>,
    direction: either {
        Neutral,
        Up,
        Down,
    },
    location: either {
        AtFloor {
            at: Floor,
            doors: either {
                Closed,
                Opening {
                    openAt: Time,
                },
                Open {
                    closeAt: Time,
                },
                Closing {
                    closedAt: Time,
                },
            },
        },
        Between {
            next: Floor,
            // doors are closed for safety purposes
        },
    },
}
