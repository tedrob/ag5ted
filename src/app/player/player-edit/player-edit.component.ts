import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  id: number;
  editMode = false;
  playerForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    console.log(this.playerForm);
    if (this.editMode) {
      console.log(this.playerForm);
      this.playerService.updatePlayer(this.id, this.playerForm.value);
    } else {
      this.playerService.addPlayer(this.playerForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let playerName = '';
    let playerDescription = '';

    if (this.editMode) {
      const player = this.playerService.getplayer(this.id);
      playerName = player.name;
      playerDescription = player.description;
    }

    this.playerForm = new FormGroup({
      'name' : new FormControl(playerName, Validators.required),
      'description': new FormControl(playerDescription, Validators.required)
    });
  }

}
