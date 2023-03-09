import React = require("react");
import { ReactWidget } from "@theia/core/lib/browser";

export class ExerciseDescriptionWidget extends ReactWidget {
    static readonly ID = "exercise-description:widget";
    static readonly LABEL = "Exercise Description Widget";

    render(): React.ReactElement {
        return (
            <div>
                <p>
                    You need to create a loop that only stops when all 4
                    characters of a password have been guessed. On each loop
                    iteration you need to verify the following:
                </p>
                <p>
                    (1) Increases guesses by 1 and prints the message 'one X'
                    (where X is replaced with the current number of correct
                    guesses).
                </p>
                <p>
                    (2) Resets something else to 0 and prints the message 'two'
                    to the console.
                </p>
                <p>Another verification point to end.</p>
                <p>
                    Last but not least, make sure this and that and still a huge
                    amount of text here to display that never ends except at
                    last but not least, make sure this and that and ...
                </p>
            </div>
        );
    }
}
