import $ from 'jquery';
import Jira from '../lib/jira';

let $propagateButton = $('<ul id="opsbar-propagation" class="toolbar-group pluggable-ops"><li class="toolbar-item"><a id="propagation" title="Create Code Propagation sub-tasks for this issue" class="toolbar-trigger" href="#"><span class="trigger-label">Propagate</span></a></li></ul>');
$propagateButton.insertAfter("#opsbar-opsbar-transitions");

$propagateButton.click(function() {
  let jira = new Jira();
  jira.propagate();
});
