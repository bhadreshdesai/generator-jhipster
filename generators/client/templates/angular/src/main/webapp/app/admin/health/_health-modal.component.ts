<%#
 Copyright 2013-2018 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see http://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { <%=jhiPrefixCapitalized%>HealthService } from './health.service';

@Component({
    selector: '<%= jhiPrefixDashed %>-health-modal',
    templateUrl: './health-modal.component.html'
})
export class <%=jhiPrefixCapitalized%>HealthModalComponent {

    currentHealth: any;

    constructor(private healthService: <%=jhiPrefixCapitalized%>HealthService, public activeModal: NgbActiveModal) {}

    baseName(name) {
        return this.healthService.getBaseName(name);
    }

    subSystemName(name) {
        return this.healthService.getSubSystemName(name);
    }

    readableValue(value: number) {
        if (this.currentHealth.name === 'diskSpace') {
            // Should display storage space in an human readable unit
            const val = value / 1073741824;
            if (val > 1) { // Value
                return val.toFixed(2) + ' GB';
            } else {
                return (value / 1048576).toFixed(2) + ' MB';
            }
        }

        if (typeof value === 'object') {
            return JSON.stringify(value);
        } else {
            return value.toString();
        }
    }
}
