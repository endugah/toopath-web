import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Track} from '../../objects/track';
import {TrackApiService} from '../services/track-api.service';

@Component({
  selector: 'app-my-tracks',
  templateUrl: './my-tracks.component.html',
  styleUrls: ['./my-tracks.component.css']
})
export class MyTracksComponent implements OnInit {

  tracks: Track[];
  deviceId: number;
  deviceName: string;

  constructor(private _activatedRoute: ActivatedRoute, private _trackApiService: TrackApiService) {
  }

  ngOnInit() {
    this.deviceName = localStorage.getItem('currentDeviceName');
    this._activatedRoute.params.subscribe(async params => {
      this.deviceId = params['deviceId'];
      this._trackApiService.getTracks(this.deviceId).subscribe(
        result => {
          this.tracks = result;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  sendDeleteTrack(track: Track) {
    this._trackApiService.deleteTrack(this.deviceId, track.tid).subscribe(
      succes => {
        const index = this.tracks.indexOf(track, 0);
        if (index > -1) {
          this.tracks.splice(index, 1);
        }
      });
  }

  saveTrackName(trackName: string) {
    localStorage.setItem('currentTrackName', trackName);
  }

}
