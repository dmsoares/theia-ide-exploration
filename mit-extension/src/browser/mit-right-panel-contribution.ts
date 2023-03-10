import { inject, injectable } from "@theia/core/shared/inversify";
import { MenuModelRegistry, URI } from "@theia/core";
import { EditorManager } from "@theia/editor/lib/browser/editor-manager";
import { RightPanelWidget } from "./mit-right-panel-widget";
import {
    AbstractViewContribution,
    FrontendApplicationContribution,
} from "@theia/core/lib/browser";
import { Command, CommandRegistry } from "@theia/core/lib/common/command";
import { TerminalCommands } from "@theia/terminal/lib/browser/terminal-frontend-contribution";
import Config from "./config.json";

export const RightPanelCommand: Command = { id: "right-panel:command" };

@injectable()
export class RightPanelContribution
    extends AbstractViewContribution<RightPanelWidget>
    implements FrontendApplicationContribution
{
    @inject(EditorManager) protected readonly editorManager: EditorManager;
    @inject(CommandRegistry) protected readonly commands: CommandRegistry;

    /**
     * `AbstractViewContribution` handles the creation and registering
     *  of the widget including commands, menus, and keybindings.
     *
     * We can pass `defaultWidgetOptions` which define widget properties such as
     * its location `area` (`main`, `left`, `right`, `bottom`), `mode`, and `ref`.
     *
     */
    constructor() {
        super({
            widgetId: RightPanelWidget.ID,
            widgetName: RightPanelWidget.LABEL,
            defaultWidgetOptions: { area: "main", mode: "open-to-right" },
            toggleCommandId: RightPanelCommand.id,
        });
    }

    async initializeLayout(): Promise<void> {
        await this.editorManager.open(
            URI.fromFilePath(Config.FILE_URI as string)
        );
        await this.openView();

        this.commands.executeCommand(TerminalCommands.NEW.id);
    }

    /**
     * Example command registration to open the widget from the menu, and quick-open.
     * For a simpler use case, it is possible to simply call:
     ```ts
        super.registerCommands(commands)
     ```
     *
     * For more flexibility, we can pass `OpenViewArguments` which define
     * options on how to handle opening the widget:
     *
     ```ts
        toggle?: boolean
        activate?: boolean;
        reveal?: boolean;
     ```
     *
     * @param commands
     */
    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(RightPanelCommand, {
            execute: () => super.openView({ activate: false, reveal: true }),
        });
    }

    /**
     * Example menu registration to contribute a menu item used to open the widget.
     * Default location when extending the `AbstractViewContribution` is the `View` main-menu item.
     *
     * We can however define new menu path locations in the following way:
     ```ts
        menus.registerMenuAction(CommonMenus.HELP, {
            commandId: 'id',
            label: 'label'
        });
     ```
     *
     * @param menus
     */
    registerMenus(menus: MenuModelRegistry): void {
        super.registerMenus(menus);
    }
}
