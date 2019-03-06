import core from '../../framework/core';

import linksView from './modules/linksView';
import dataView from './modules/dataView';

core.addModule('linksView', linksView);
core.addModule('dataView', dataView);
core.initModule('linksView');
core.initModule('dataView');
