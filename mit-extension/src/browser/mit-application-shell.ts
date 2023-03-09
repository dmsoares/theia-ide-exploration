import { Layout, SplitPanel } from "@phosphor/widgets";
import { RecursivePartial } from "@theia/core";
import {
  ApplicationShell,
  ApplicationShellOptions,
  CorePreferences,
  DockPanelRenderer,
  DockPanelRendererFactory,
  SidePanelHandler,
  SidePanelHandlerFactory,
  SplitPositionHandler,
  StatusBarImpl,
} from "@theia/core/lib/browser";
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state";
import { SaveResourceService } from "@theia/core/lib/browser/save-resource-service";
import { SecondaryWindowHandler } from "@theia/core/lib/browser/secondary-window-handler";
import { inject, injectable, optional } from "@theia/core/shared/inversify";

@injectable()
export class MitApplicationShell extends ApplicationShell {
  /**
   * Construct a new application shell.
   */
  constructor(
    @inject(DockPanelRendererFactory)
    protected dockPanelRendererFactory: () => DockPanelRenderer,
    @inject(StatusBarImpl) protected readonly statusBar: StatusBarImpl,
    @inject(SidePanelHandlerFactory)
    protected readonly sidePanelHandlerFactory: () => SidePanelHandler,
    @inject(SplitPositionHandler)
    protected splitPositionHandler: SplitPositionHandler,
    @inject(FrontendApplicationStateService)
    protected readonly applicationStateService: FrontendApplicationStateService,
    @inject(ApplicationShellOptions)
    @optional()
    options: RecursivePartial<ApplicationShell.Options> = {},
    @inject(CorePreferences)
    protected readonly corePreferences: CorePreferences,
    @inject(SaveResourceService)
    protected readonly saveResourceService: SaveResourceService,
    @inject(SecondaryWindowHandler)
    protected readonly secondaryWindowHandler: SecondaryWindowHandler
  ) {
    super(
      dockPanelRendererFactory,
      statusBar,
      sidePanelHandlerFactory,
      splitPositionHandler,
      applicationStateService,
      options,
      corePreferences,
      saveResourceService,
      secondaryWindowHandler
    );
  }

  /**
   * Assemble the application shell layout. Override this method in order to change the arrangement
   * of the main area and the side panels.
   */
  protected override createLayout(): Layout {
    const bottomSplitLayout = this.createSplitLayout(
      [this.mainPanel, this.bottomPanel],
      [1, 0],
      { orientation: "vertical", spacing: 0 }
    );
    const panelForBottomArea = new SplitPanel({ layout: bottomSplitLayout });
    panelForBottomArea.id = "theia-bottom-split-panel";

    const leftRightSplitLayout = this.createSplitLayout(
      [panelForBottomArea],
      [1],
      { orientation: "horizontal", spacing: 0 }
    );
    const panelForSideAreas = new SplitPanel({ layout: leftRightSplitLayout });
    panelForSideAreas.id = "theia-left-right-split-panel";

    return this.createBoxLayout(
      [this.topPanel, panelForSideAreas, this.statusBar],
      [0, 1, 0],
      {
        direction: "top-to-bottom",
        spacing: 0,
      }
    );
  }
}
