import { Component } from '@angular/core';

interface NotificationData {
  icon: string;
  title: string;
  time: string;
}

@Component({
  selector: 'beam-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  notificationData: NotificationData[] = [];
}
