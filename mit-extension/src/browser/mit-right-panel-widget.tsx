import * as React from "react";
import {
    inject,
    injectable,
    postConstruct,
} from "@theia/core/shared/inversify";
import { ReactWidget } from "@theia/core/lib/browser";
import { ExerciseDescriptionWidget } from "./mit-exercise-description-widget";

@injectable()
export class RightPanelWidget extends ReactWidget {
    static readonly ID = "right-panel:widget";
    static readonly LABEL = "RightPanel Widget";

    @inject(ExerciseDescriptionWidget)
    protected readonly exerciseDescriptionWidget: ExerciseDescriptionWidget;

    constructor() {
        super();
        this.node.tabIndex = 0;
        this.id = RightPanelWidget.ID;
        this.addClass("mit-right-panel");
    }

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = RightPanelWidget.ID;
        this.title.closable = false;
        this.title.label = "Info";
        this.update();
    }

    render(): React.ReactElement {
        return (
            <div id="widget-container">
                <h2>Right Panel</h2>
                {this.exerciseDescriptionWidget.render()}
            </div>
        );
    }
}
