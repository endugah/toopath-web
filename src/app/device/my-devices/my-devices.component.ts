import {Component, OnInit} from '@angular/core';
import {DeviceApiService} from "../services/device-api.service";
import {Device} from "../../objects/device";
import {User} from "../../objects/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-my-devices',
  templateUrl: './my-devices.component.html',
  styleUrls: ['./my-devices.component.css']
})
export class AppMyDevicesComponent implements OnInit {

  devices: Device[];
  user: User;

  constructor(private _deviceApiService: DeviceApiService, private _router: Router) {
  }

  ngOnInit() {
    this._deviceApiService.getDevices().subscribe(
      result => {
        this.devices = <Device[]>result;
      }, error => {
        console.log(error);
      }
    );
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  sendDeleteDevice(device: Device) {
    this._deviceApiService.deleteDevice(device.did).subscribe(
      succes => {
        let index = this.devices.indexOf(device, 0);
        if (index > -1) {
          this.devices.splice(index, 1);
        }
      });
  }
}