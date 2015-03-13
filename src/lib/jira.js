import $ from 'jquery';
import _ from 'underscore';

class Jira {
  constructor() {
    this.masterTicketNumber = '';
    this.affectsVersion = '';
    this.targetBranches = [];

    this.MASTER_VERSION = 13;

    this.currentBranch = '';
  }

  propagate() {
    this.determineMasterTicketNumber();
    this.determineAffectsVersion();
    this.determineTargetBranches();
    console.log({
      affectsVersion: this.affectsVersion,
      targetBranches: this.targetBranches
    });
    this.createTicket();
  }

  determineMasterTicketNumber() {
    this.masterTicketNumber = $("#key-val").html();
  }

  determineAffectsVersion() {
    let versionFieldContent = $("#versions-field span").html();
    let version = parseInt(versionFieldContent.replace(/v/g, ''), 10);
    this.affectsVersion = version;
  }

  determineTargetBranches() {
    let targetVersions = _.range(this.affectsVersion, this.MASTER_VERSION);
    this.targetBranches = targetVersions.map((version) => `0${version}_release`);
    this.targetBranches.push("master");
  }

  createTicket() {
    $('#opsbar-operations_more .dropdown-text').click();
    setTimeout(() => { 
      $('#create-subtask span').click();

      setTimeout(() => {
        this.fillTicket();
      }, 1000);
    }, 10);
  }

  fillTicket() {
    this.currentBranch = this.targetBranches.shift();
    this.fillSummary();
    this.fillTargetBranch();
    this.selectIssueType();
  }

  fillSummary() {
    let title = `Propagate ${this.masterTicketNumber} to ${this.currentBranch}`;
    $('#summary').val(title); 
  }

  fillTargetBranch() {
    let selector = `#customfield_12905 option[title='${this.currentBranch}']`;
    $(selector).attr('selected', 'selected');
  }

  selectIssueType() {
    $('#issuetype-field').click(); 
    setTimeout(() => {
      $('.aui-list-item.aui-list-item-li-code-propagation').click();

      setTimeout(() => {
        this.submitTicket();
      }, 10)
    }, 20); 
  }

  submitTicket() {
    $('#create-issue-submit').click();
    if(this.targetBranches.length > 0){
      setTimeout(() => {
        this.createTicket();
      }, 5000);
    } else {
      setTimeout(function(){ window.location = window.location }, 5000);
    }
  }
}

export default Jira;
