<div ng-controller="PartiesListCtrl">
  <ul>
    <li ng-repeat="party in parties">
      {{party.name}}
      <p>{{party.description}}</p>
    </li>
  </ul>
</div>
<p>Total number of parties: {{parties.length}}</p>