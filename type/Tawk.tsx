export interface TawkVisitor {
  name?: string;
  email?: string;
  hash?: string;
  [key: string]: any;
}

export interface TawkAttributes {
  id: string;
  value: string;
  text: string;
}

export interface TawkTag {
  id: string;
  name: string;
}

export interface TawkAPI {
  // Widget Control
  maximize(): void;
  minimize(): void;
  toggle(): void;
  popup(): void;
  showWidget(): void;
  hideWidget(): void;
  toggleVisibility(): void;
  endChat(): void;

  // Widget State
  getWindowType(): "inline" | "embed";
  getStatus(): "online" | "away" | "offline";
  isChatMaximized(): boolean;
  isChatMinimized(): boolean;
  isChatHidden(): boolean;
  isChatOngoing(): boolean;
  isVisitorEngaged(): boolean;
  onLoaded(): void;
  onBeforeLoad(): void;

  // Visitor Management
  setAttributes(
    attributes: { [key: string]: any },
    callback?: (error: any) => void
  ): void;
  addEvent(
    event: string,
    metadata?: { [key: string]: any },
    callback?: (error: any) => void
  ): void;
  addTags(tags: string[], callback?: (error: any) => void): void;
  removeTags(tags: string[], callback?: (error: any) => void): void;

  // Secure Mode
  visitor?: TawkVisitor;

  // Event Callbacks
  onLoad?(): void;
  onStatusChange?(status: "online" | "away" | "offline"): void;
  onBeforeLoad?(): void;
  onChatMaximized?(): void;
  onChatMinimized?(): void;
  onChatHidden?(): void;
  onChatStarted?(): void;
  onChatEnded?(): void;
  onPrechatSubmit?(data: any): void;
  onOfflineSubmit?(data: any): void;
  onChatMessageVisitor?(message: string): void;
  onChatMessageAgent?(message: string): void;
  onChatMessageSystem?(message: string): void;
  onAgentJoinChat?(data: {
    name: string;
    position: string;
    image: string;
  }): void;
  onAgentLeaveChat?(data: {
    name: string;
    position: string;
    image: string;
  }): void;
  onChatSatisfaction?(satisfaction: number): void;
  onVisitorNameChanged?(visitorName: string): void;
  onFileUpload?(link: string): void;
  onTagsUpdated?(tags: TawkTag[]): void;
  onUnreadCountChanged?(unreadCount: number): void;
}
