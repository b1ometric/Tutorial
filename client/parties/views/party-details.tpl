Here you will see and change the details of the party:

<input ng-model="party.name" ng-disabled="party.owner != $root.currentUser._id">
<input ng-model="party.description" ng-disabled="party.owner != $root.currentUser._id">
<label>Is public</label>
<input type="checkbox" ng-model="party.public" ng-disabled="party.owner != $root.currentUser._id">

<button ng-click="save()">Save</button>
<button ng-click="reset()">Reset form</button>
<button><a href="/parties">Cancel</a></button>

<ul ng-show="canInvite()">
  Users to invite:
  <li ng-repeat="user in users | uninvited:party">
    <div>{{ user | displayName }}</div>
    <button ng-click="invite(user)">Invite</button>
  </li>
  <li ng-if="(users | uninvited:party).length <= 0">
    Everyone are already invited.
  </li>
</ul>

<div class="party-details-maps">
  <div class="angular-google-map-container">
    <ui-gmap-google-map center="map.center" events="map.events" zoom="map.zoom">
      <ui-gmap-marker coords="party.location" options="map.marker.options" events="map.marker.events" idkey="party._id">
      </ui-gmap-marker>
    </ui-gmap-google-map>
  </div>
</div>