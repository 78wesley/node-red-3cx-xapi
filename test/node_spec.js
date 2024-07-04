var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../node.js');

helper.init(require.resolve('node-red'));

describe('node-red-contrib-3cx-xapi node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'node-red-contrib-3cx-xapi');
            done();
        });
    });

    it('should handle ListActiveCall()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListActiveCall',
                ListActiveCall_top: '<node property>', // (1) define node properties
                ListActiveCall_skip: '<node property>', // (1) define node properties
                ListActiveCall_search: '<node property>', // (1) define node properties
                ListActiveCall_filter: '<node property>', // (1) define node properties
                ListActiveCall_count: '<node property>', // (1) define node properties
                ListActiveCall_orderby: '<node property>', // (1) define node properties
                ListActiveCall_select: '<node property>', // (1) define node properties
                ListActiveCall_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DropCall()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DropCall',
                DropCall_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFilter()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFilter',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetLogs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetLogs',
                GetLogs_extension: '<node property>', // (1) define node properties
                GetLogs_call: '<node property>', // (1) define node properties
                GetLogs_search: '<node property>', // (1) define node properties
                GetLogs_severity: '<node property>', // (1) define node properties
                GetLogs_top: '<node property>', // (1) define node properties
                GetLogs_skip: '<node property>', // (1) define node properties
                GetLogs_top: '<node property>', // (1) define node properties
                GetLogs_skip: '<node property>', // (1) define node properties
                GetLogs_search: '<node property>', // (1) define node properties
                GetLogs_filter: '<node property>', // (1) define node properties
                GetLogs_count: '<node property>', // (1) define node properties
                GetLogs_select: '<node property>', // (1) define node properties
                GetLogs_orderby: '<node property>', // (1) define node properties
                GetLogs_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle PurgeLogs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'PurgeLogs',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetAntiHackingSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetAntiHackingSettings',
                GetAntiHackingSettings_select: '<node property>', // (1) define node properties
                GetAntiHackingSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateAntiHackingSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateAntiHackingSettings',
                UpdateAntiHackingSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListBackups()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListBackups',
                ListBackups_top: '<node property>', // (1) define node properties
                ListBackups_skip: '<node property>', // (1) define node properties
                ListBackups_search: '<node property>', // (1) define node properties
                ListBackups_filter: '<node property>', // (1) define node properties
                ListBackups_count: '<node property>', // (1) define node properties
                ListBackups_orderby: '<node property>', // (1) define node properties
                ListBackups_select: '<node property>', // (1) define node properties
                ListBackups_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetBackupExtras()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetBackupExtras',
                GetBackupExtras_fileName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteBackups()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteBackups',
                DeleteBackups_fileName: '<node property>', // (1) define node properties
                DeleteBackups_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Restore()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Restore',
                Restore_fileName: '<node property>', // (1) define node properties
                Restore_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Backup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Backup',
                Backup_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCanCreateBackup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCanCreateBackup',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetBackupSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetBackupSettings',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetBackupFailoverSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetBackupFailoverSettings',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetBackupFailoverSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetBackupFailoverSettings',
                SetBackupFailoverSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFailoverScripts()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFailoverScripts',
                GetFailoverScripts_top: '<node property>', // (1) define node properties
                GetFailoverScripts_skip: '<node property>', // (1) define node properties
                GetFailoverScripts_search: '<node property>', // (1) define node properties
                GetFailoverScripts_filter: '<node property>', // (1) define node properties
                GetFailoverScripts_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetBackupSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetBackupSettings',
                SetBackupSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetBackupRepositorySettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetBackupRepositorySettings',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetBackupRepositorySettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetBackupRepositorySettings',
                SetBackupRepositorySettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetRestoreSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetRestoreSettings',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetRestoreSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetRestoreSettings',
                SetRestoreSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListBlackListNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListBlackListNumber',
                ListBlackListNumber_top: '<node property>', // (1) define node properties
                ListBlackListNumber_skip: '<node property>', // (1) define node properties
                ListBlackListNumber_search: '<node property>', // (1) define node properties
                ListBlackListNumber_filter: '<node property>', // (1) define node properties
                ListBlackListNumber_count: '<node property>', // (1) define node properties
                ListBlackListNumber_orderby: '<node property>', // (1) define node properties
                ListBlackListNumber_select: '<node property>', // (1) define node properties
                ListBlackListNumber_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateBlackListNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateBlackListNumber',
                CreateBlackListNumber_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetBlackListNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetBlackListNumber',
                GetBlackListNumber_id: '<node property>', // (1) define node properties
                GetBlackListNumber_select: '<node property>', // (1) define node properties
                GetBlackListNumber_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateBlackListNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateBlackListNumber',
                UpdateBlackListNumber_id: '<node property>', // (1) define node properties
                UpdateBlackListNumber_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteBlackListNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteBlackListNumber',
                DeleteBlackListNumber_id: '<node property>', // (1) define node properties
                DeleteBlackListNumber_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BulkNumbersDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BulkNumbersDelete',
                BulkNumbersDelete_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListBlocklistAddr()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListBlocklistAddr',
                ListBlocklistAddr_top: '<node property>', // (1) define node properties
                ListBlocklistAddr_skip: '<node property>', // (1) define node properties
                ListBlocklistAddr_search: '<node property>', // (1) define node properties
                ListBlocklistAddr_filter: '<node property>', // (1) define node properties
                ListBlocklistAddr_count: '<node property>', // (1) define node properties
                ListBlocklistAddr_orderby: '<node property>', // (1) define node properties
                ListBlocklistAddr_select: '<node property>', // (1) define node properties
                ListBlocklistAddr_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateBlocklistAddr()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateBlocklistAddr',
                CreateBlocklistAddr_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetBlocklistAddr()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetBlocklistAddr',
                GetBlocklistAddr_id: '<node property>', // (1) define node properties
                GetBlocklistAddr_select: '<node property>', // (1) define node properties
                GetBlocklistAddr_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateBlocklistAddr()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateBlocklistAddr',
                UpdateBlocklistAddr_id: '<node property>', // (1) define node properties
                UpdateBlocklistAddr_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteBlocklistAddr()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteBlocklistAddr',
                DeleteBlocklistAddr_id: '<node property>', // (1) define node properties
                DeleteBlocklistAddr_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BulkIpsDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BulkIpsDelete',
                BulkIpsDelete_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListCallCostSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListCallCostSettings',
                ListCallCostSettings_top: '<node property>', // (1) define node properties
                ListCallCostSettings_skip: '<node property>', // (1) define node properties
                ListCallCostSettings_search: '<node property>', // (1) define node properties
                ListCallCostSettings_filter: '<node property>', // (1) define node properties
                ListCallCostSettings_count: '<node property>', // (1) define node properties
                ListCallCostSettings_orderby: '<node property>', // (1) define node properties
                ListCallCostSettings_select: '<node property>', // (1) define node properties
                ListCallCostSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateCost()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateCost',
                UpdateCost_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ExportCallCosts()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ExportCallCosts',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCallFlowApp()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCallFlowApp',
                GetCallFlowApp_id: '<node property>', // (1) define node properties
                GetCallFlowApp_select: '<node property>', // (1) define node properties
                GetCallFlowApp_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateCallFlowApp()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateCallFlowApp',
                UpdateCallFlowApp_id: '<node property>', // (1) define node properties
                UpdateCallFlowApp_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteCallFlowApp()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteCallFlowApp',
                DeleteCallFlowApp_id: '<node property>', // (1) define node properties
                DeleteCallFlowApp_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListCallFlowApp()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListCallFlowApp',
                ListCallFlowApp_top: '<node property>', // (1) define node properties
                ListCallFlowApp_skip: '<node property>', // (1) define node properties
                ListCallFlowApp_search: '<node property>', // (1) define node properties
                ListCallFlowApp_filter: '<node property>', // (1) define node properties
                ListCallFlowApp_count: '<node property>', // (1) define node properties
                ListCallFlowApp_orderby: '<node property>', // (1) define node properties
                ListCallFlowApp_select: '<node property>', // (1) define node properties
                ListCallFlowApp_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateCallFlowApp()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateCallFlowApp',
                CreateCallFlowApp_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetAudioFiles()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetAudioFiles',
                GetAudioFiles_id: '<node property>', // (1) define node properties
                GetAudioFiles_top: '<node property>', // (1) define node properties
                GetAudioFiles_skip: '<node property>', // (1) define node properties
                GetAudioFiles_search: '<node property>', // (1) define node properties
                GetAudioFiles_filter: '<node property>', // (1) define node properties
                GetAudioFiles_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteAudioFile()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteAudioFile',
                DeleteAudioFile_id: '<node property>', // (1) define node properties
                DeleteAudioFile_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadCallHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadCallHistory',
                DownloadCallHistory_top: '<node property>', // (1) define node properties
                DownloadCallHistory_skip: '<node property>', // (1) define node properties
                DownloadCallHistory_search: '<node property>', // (1) define node properties
                DownloadCallHistory_filter: '<node property>', // (1) define node properties
                DownloadCallHistory_count: '<node property>', // (1) define node properties
                DownloadCallHistory_select: '<node property>', // (1) define node properties
                DownloadCallHistory_orderby: '<node property>', // (1) define node properties
                DownloadCallHistory_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListCallHistoryView()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListCallHistoryView',
                ListCallHistoryView_top: '<node property>', // (1) define node properties
                ListCallHistoryView_skip: '<node property>', // (1) define node properties
                ListCallHistoryView_search: '<node property>', // (1) define node properties
                ListCallHistoryView_filter: '<node property>', // (1) define node properties
                ListCallHistoryView_count: '<node property>', // (1) define node properties
                ListCallHistoryView_orderby: '<node property>', // (1) define node properties
                ListCallHistoryView_select: '<node property>', // (1) define node properties
                ListCallHistoryView_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCallParkingSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCallParkingSettings',
                GetCallParkingSettings_select: '<node property>', // (1) define node properties
                GetCallParkingSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateCallParkingSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateCallParkingSettings',
                UpdateCallParkingSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCallTypesSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCallTypesSettings',
                GetCallTypesSettings_select: '<node property>', // (1) define node properties
                GetCallTypesSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateCallTypesSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateCallTypesSettings',
                UpdateCallTypesSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCDRSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCDRSettings',
                GetCDRSettings_select: '<node property>', // (1) define node properties
                GetCDRSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateCDRSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateCDRSettings',
                UpdateCDRSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadChatHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadChatHistory',
                DownloadChatHistory_clientTimeZone: '<node property>', // (1) define node properties
                DownloadChatHistory_top: '<node property>', // (1) define node properties
                DownloadChatHistory_skip: '<node property>', // (1) define node properties
                DownloadChatHistory_search: '<node property>', // (1) define node properties
                DownloadChatHistory_filter: '<node property>', // (1) define node properties
                DownloadChatHistory_count: '<node property>', // (1) define node properties
                DownloadChatHistory_select: '<node property>', // (1) define node properties
                DownloadChatHistory_orderby: '<node property>', // (1) define node properties
                DownloadChatHistory_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListChatHistoryView()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListChatHistoryView',
                ListChatHistoryView_top: '<node property>', // (1) define node properties
                ListChatHistoryView_skip: '<node property>', // (1) define node properties
                ListChatHistoryView_search: '<node property>', // (1) define node properties
                ListChatHistoryView_filter: '<node property>', // (1) define node properties
                ListChatHistoryView_count: '<node property>', // (1) define node properties
                ListChatHistoryView_orderby: '<node property>', // (1) define node properties
                ListChatHistoryView_select: '<node property>', // (1) define node properties
                ListChatHistoryView_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetChatLogSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetChatLogSettings',
                GetChatLogSettings_select: '<node property>', // (1) define node properties
                GetChatLogSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateChatLogSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateChatLogSettings',
                UpdateChatLogSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadChatMessagesHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadChatMessagesHistory',
                DownloadChatMessagesHistory_clientTimeZone: '<node property>', // (1) define node properties
                DownloadChatMessagesHistory_top: '<node property>', // (1) define node properties
                DownloadChatMessagesHistory_skip: '<node property>', // (1) define node properties
                DownloadChatMessagesHistory_search: '<node property>', // (1) define node properties
                DownloadChatMessagesHistory_filter: '<node property>', // (1) define node properties
                DownloadChatMessagesHistory_count: '<node property>', // (1) define node properties
                DownloadChatMessagesHistory_select: '<node property>', // (1) define node properties
                DownloadChatMessagesHistory_orderby: '<node property>', // (1) define node properties
                DownloadChatMessagesHistory_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListChatMessagesHistoryView()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListChatMessagesHistoryView',
                ListChatMessagesHistoryView_top: '<node property>', // (1) define node properties
                ListChatMessagesHistoryView_skip: '<node property>', // (1) define node properties
                ListChatMessagesHistoryView_search: '<node property>', // (1) define node properties
                ListChatMessagesHistoryView_filter: '<node property>', // (1) define node properties
                ListChatMessagesHistoryView_count: '<node property>', // (1) define node properties
                ListChatMessagesHistoryView_orderby: '<node property>', // (1) define node properties
                ListChatMessagesHistoryView_select: '<node property>', // (1) define node properties
                ListChatMessagesHistoryView_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCodecsSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCodecsSettings',
                GetCodecsSettings_select: '<node property>', // (1) define node properties
                GetCodecsSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateCodecsSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateCodecsSettings',
                UpdateCodecsSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetWebMeetingZones()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetWebMeetingZones',
                GetWebMeetingZones_top: '<node property>', // (1) define node properties
                GetWebMeetingZones_skip: '<node property>', // (1) define node properties
                GetWebMeetingZones_search: '<node property>', // (1) define node properties
                GetWebMeetingZones_filter: '<node property>', // (1) define node properties
                GetWebMeetingZones_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GenerateApiKey()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GenerateApiKey',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetConferenceSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetConferenceSettings',
                GetConferenceSettings_select: '<node property>', // (1) define node properties
                GetConferenceSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateConferenceSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateConferenceSettings',
                UpdateConferenceSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMCURequestStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMCURequestStatus',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetOnboardMcuData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetOnboardMcuData',
                GetOnboardMcuData_top: '<node property>', // (1) define node properties
                GetOnboardMcuData_skip: '<node property>', // (1) define node properties
                GetOnboardMcuData_search: '<node property>', // (1) define node properties
                GetOnboardMcuData_filter: '<node property>', // (1) define node properties
                GetOnboardMcuData_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetOnboardMeetings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetOnboardMeetings',
                GetOnboardMeetings_top: '<node property>', // (1) define node properties
                GetOnboardMeetings_skip: '<node property>', // (1) define node properties
                GetOnboardMeetings_search: '<node property>', // (1) define node properties
                GetOnboardMeetings_filter: '<node property>', // (1) define node properties
                GetOnboardMeetings_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMCURows()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMCURows',
                GetMCURows_top: '<node property>', // (1) define node properties
                GetMCURows_skip: '<node property>', // (1) define node properties
                GetMCURows_search: '<node property>', // (1) define node properties
                GetMCURows_filter: '<node property>', // (1) define node properties
                GetMCURows_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMCURow()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMCURow',
                GetMCURow_guid: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateMCURequestStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateMCURequestStatus',
                UpdateMCURequestStatus_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetConsoleRestrictions()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetConsoleRestrictions',
                GetConsoleRestrictions_select: '<node property>', // (1) define node properties
                GetConsoleRestrictions_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateConsoleRestrictions()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateConsoleRestrictions',
                UpdateConsoleRestrictions_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListContact()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListContact',
                ListContact_top: '<node property>', // (1) define node properties
                ListContact_skip: '<node property>', // (1) define node properties
                ListContact_search: '<node property>', // (1) define node properties
                ListContact_filter: '<node property>', // (1) define node properties
                ListContact_count: '<node property>', // (1) define node properties
                ListContact_orderby: '<node property>', // (1) define node properties
                ListContact_select: '<node property>', // (1) define node properties
                ListContact_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateContact()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateContact',
                CreateContact_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetDirSearchSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetDirSearchSettings',
                SetDirSearchSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetDirSearchSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetDirSearchSettings',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BatchContactsDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BatchContactsDelete',
                BatchContactsDelete_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Office365ContactsBulkDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Office365ContactsBulkDelete',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CRMContactsBulkDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CRMContactsBulkDelete',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle AllContactsBulkDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'AllContactsBulkDelete',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ExportContacts()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ExportContacts',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetContact()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetContact',
                GetContact_id: '<node property>', // (1) define node properties
                GetContact_select: '<node property>', // (1) define node properties
                GetContact_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateContact()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateContact',
                UpdateContact_id: '<node property>', // (1) define node properties
                UpdateContact_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteContact()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteContact',
                DeleteContact_id: '<node property>', // (1) define node properties
                DeleteContact_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListCountry()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListCountry',
                ListCountry_top: '<node property>', // (1) define node properties
                ListCountry_skip: '<node property>', // (1) define node properties
                ListCountry_search: '<node property>', // (1) define node properties
                ListCountry_filter: '<node property>', // (1) define node properties
                ListCountry_count: '<node property>', // (1) define node properties
                ListCountry_orderby: '<node property>', // (1) define node properties
                ListCountry_select: '<node property>', // (1) define node properties
                ListCountry_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCountryCodes()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCountryCodes',
                GetCountryCodes_select: '<node property>', // (1) define node properties
                GetCountryCodes_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateCountryCodes()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateCountryCodes',
                UpdateCountryCodes_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCrmIntegration()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCrmIntegration',
                GetCrmIntegration_select: '<node property>', // (1) define node properties
                GetCrmIntegration_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateCrmIntegration()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateCrmIntegration',
                UpdateCrmIntegration_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Test()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Test',
                Test_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteCrmContacts()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteCrmContacts',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetOAuthState()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetOAuthState',
                SetOAuthState_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetOAuth()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetOAuth',
                GetOAuth_variable: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCrmTemplateSource()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCrmTemplateSource',
                GetCrmTemplateSource_name: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GeCrmtTemplates()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GeCrmtTemplates',
                GeCrmtTemplates_top: '<node property>', // (1) define node properties
                GeCrmtTemplates_skip: '<node property>', // (1) define node properties
                GeCrmtTemplates_search: '<node property>', // (1) define node properties
                GeCrmtTemplates_filter: '<node property>', // (1) define node properties
                GeCrmtTemplates_count: '<node property>', // (1) define node properties
                GeCrmtTemplates_select: '<node property>', // (1) define node properties
                GeCrmtTemplates_orderby: '<node property>', // (1) define node properties
                GeCrmtTemplates_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCrmTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCrmTemplate',
                GetCrmTemplate_name: '<node property>', // (1) define node properties
                GetCrmTemplate_select: '<node property>', // (1) define node properties
                GetCrmTemplate_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteCrmTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteCrmTemplate',
                DeleteCrmTemplate_name: '<node property>', // (1) define node properties
                DeleteCrmTemplate_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListCustomPrompt()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListCustomPrompt',
                ListCustomPrompt_top: '<node property>', // (1) define node properties
                ListCustomPrompt_skip: '<node property>', // (1) define node properties
                ListCustomPrompt_search: '<node property>', // (1) define node properties
                ListCustomPrompt_filter: '<node property>', // (1) define node properties
                ListCustomPrompt_count: '<node property>', // (1) define node properties
                ListCustomPrompt_orderby: '<node property>', // (1) define node properties
                ListCustomPrompt_select: '<node property>', // (1) define node properties
                ListCustomPrompt_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteCustomPrompt()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteCustomPrompt',
                DeleteCustomPrompt_filename: '<node property>', // (1) define node properties
                DeleteCustomPrompt_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetDefs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetDefs',
                GetDefs_select: '<node property>', // (1) define node properties
                GetDefs_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListCodecs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListCodecs',
                ListCodecs_top: '<node property>', // (1) define node properties
                ListCodecs_skip: '<node property>', // (1) define node properties
                ListCodecs_search: '<node property>', // (1) define node properties
                ListCodecs_filter: '<node property>', // (1) define node properties
                ListCodecs_count: '<node property>', // (1) define node properties
                ListCodecs_orderby: '<node property>', // (1) define node properties
                ListCodecs_select: '<node property>', // (1) define node properties
                ListCodecs_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListGatewayParameters()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListGatewayParameters',
                ListGatewayParameters_top: '<node property>', // (1) define node properties
                ListGatewayParameters_skip: '<node property>', // (1) define node properties
                ListGatewayParameters_search: '<node property>', // (1) define node properties
                ListGatewayParameters_filter: '<node property>', // (1) define node properties
                ListGatewayParameters_count: '<node property>', // (1) define node properties
                ListGatewayParameters_orderby: '<node property>', // (1) define node properties
                ListGatewayParameters_select: '<node property>', // (1) define node properties
                ListGatewayParameters_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListGatewayParameterValues()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListGatewayParameterValues',
                ListGatewayParameterValues_top: '<node property>', // (1) define node properties
                ListGatewayParameterValues_skip: '<node property>', // (1) define node properties
                ListGatewayParameterValues_search: '<node property>', // (1) define node properties
                ListGatewayParameterValues_filter: '<node property>', // (1) define node properties
                ListGatewayParameterValues_count: '<node property>', // (1) define node properties
                ListGatewayParameterValues_orderby: '<node property>', // (1) define node properties
                ListGatewayParameterValues_select: '<node property>', // (1) define node properties
                ListGatewayParameterValues_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListTimeZones()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListTimeZones',
                ListTimeZones_top: '<node property>', // (1) define node properties
                ListTimeZones_skip: '<node property>', // (1) define node properties
                ListTimeZones_search: '<node property>', // (1) define node properties
                ListTimeZones_filter: '<node property>', // (1) define node properties
                ListTimeZones_count: '<node property>', // (1) define node properties
                ListTimeZones_orderby: '<node property>', // (1) define node properties
                ListTimeZones_select: '<node property>', // (1) define node properties
                ListTimeZones_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetSystemParameters()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetSystemParameters',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle HasSystemOwner()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'HasSystemOwner',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetRoutes()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetRoutes',
                GetRoutes_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListDeviceInfo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListDeviceInfo',
                ListDeviceInfo_top: '<node property>', // (1) define node properties
                ListDeviceInfo_skip: '<node property>', // (1) define node properties
                ListDeviceInfo_search: '<node property>', // (1) define node properties
                ListDeviceInfo_filter: '<node property>', // (1) define node properties
                ListDeviceInfo_count: '<node property>', // (1) define node properties
                ListDeviceInfo_orderby: '<node property>', // (1) define node properties
                ListDeviceInfo_select: '<node property>', // (1) define node properties
                ListDeviceInfo_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetDeviceInfo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetDeviceInfo',
                GetDeviceInfo_id: '<node property>', // (1) define node properties
                GetDeviceInfo_select: '<node property>', // (1) define node properties
                GetDeviceInfo_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteDeviceInfo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteDeviceInfo',
                DeleteDeviceInfo_id: '<node property>', // (1) define node properties
                DeleteDeviceInfo_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Provision()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Provision',
                Provision_id: '<node property>', // (1) define node properties
                Provision_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetDialCodeSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetDialCodeSettings',
                GetDialCodeSettings_select: '<node property>', // (1) define node properties
                GetDialCodeSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateDialCodeSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateDialCodeSettings',
                UpdateDialCodeSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListDidNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListDidNumber',
                ListDidNumber_top: '<node property>', // (1) define node properties
                ListDidNumber_skip: '<node property>', // (1) define node properties
                ListDidNumber_search: '<node property>', // (1) define node properties
                ListDidNumber_filter: '<node property>', // (1) define node properties
                ListDidNumber_count: '<node property>', // (1) define node properties
                ListDidNumber_orderby: '<node property>', // (1) define node properties
                ListDidNumber_select: '<node property>', // (1) define node properties
                ListDidNumber_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPropertiesByDn()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPropertiesByDn',
                GetPropertiesByDn_dnNumber: '<node property>', // (1) define node properties
                GetPropertiesByDn_top: '<node property>', // (1) define node properties
                GetPropertiesByDn_skip: '<node property>', // (1) define node properties
                GetPropertiesByDn_search: '<node property>', // (1) define node properties
                GetPropertiesByDn_filter: '<node property>', // (1) define node properties
                GetPropertiesByDn_count: '<node property>', // (1) define node properties
                GetPropertiesByDn_select: '<node property>', // (1) define node properties
                GetPropertiesByDn_orderby: '<node property>', // (1) define node properties
                GetPropertiesByDn_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateDNProperty()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateDNProperty',
                CreateDNProperty_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateDNProperty()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateDNProperty',
                UpdateDNProperty_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteDNProperty()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteDNProperty',
                DeleteDNProperty_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetDNPropertyByName()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetDNPropertyByName',
                GetDNPropertyByName_dnNumber: '<node property>', // (1) define node properties
                GetDNPropertyByName_name: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetE164Settings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetE164Settings',
                GetE164Settings_select: '<node property>', // (1) define node properties
                GetE164Settings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateE164Settings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateE164Settings',
                UpdateE164Settings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListEmailTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListEmailTemplate',
                ListEmailTemplate_top: '<node property>', // (1) define node properties
                ListEmailTemplate_skip: '<node property>', // (1) define node properties
                ListEmailTemplate_search: '<node property>', // (1) define node properties
                ListEmailTemplate_filter: '<node property>', // (1) define node properties
                ListEmailTemplate_count: '<node property>', // (1) define node properties
                ListEmailTemplate_orderby: '<node property>', // (1) define node properties
                ListEmailTemplate_select: '<node property>', // (1) define node properties
                ListEmailTemplate_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetEmailTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetEmailTemplate',
                GetEmailTemplate_templatePath: '<node property>', // (1) define node properties
                GetEmailTemplate_select: '<node property>', // (1) define node properties
                GetEmailTemplate_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateEmailTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateEmailTemplate',
                UpdateEmailTemplate_templatePath: '<node property>', // (1) define node properties
                UpdateEmailTemplate_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetDefault()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetDefault',
                SetDefault_templatePath: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetEmergencyNotificationsSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetEmergencyNotificationsSettings',
                GetEmergencyNotificationsSettings_select: '<node property>', // (1) define node properties
                GetEmergencyNotificationsSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateEmergencyNotificationsSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateEmergencyNotificationsSettings',
                UpdateEmergencyNotificationsSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListEventLog()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListEventLog',
                ListEventLog_top: '<node property>', // (1) define node properties
                ListEventLog_skip: '<node property>', // (1) define node properties
                ListEventLog_search: '<node property>', // (1) define node properties
                ListEventLog_filter: '<node property>', // (1) define node properties
                ListEventLog_count: '<node property>', // (1) define node properties
                ListEventLog_orderby: '<node property>', // (1) define node properties
                ListEventLog_select: '<node property>', // (1) define node properties
                ListEventLog_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadEventLogs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadEventLogs',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle PurgeEventLog()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'PurgeEventLog',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle InitFax()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'InitFax',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListFax()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListFax',
                ListFax_top: '<node property>', // (1) define node properties
                ListFax_skip: '<node property>', // (1) define node properties
                ListFax_search: '<node property>', // (1) define node properties
                ListFax_filter: '<node property>', // (1) define node properties
                ListFax_count: '<node property>', // (1) define node properties
                ListFax_orderby: '<node property>', // (1) define node properties
                ListFax_select: '<node property>', // (1) define node properties
                ListFax_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateFax()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateFax',
                CreateFax_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFax()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFax',
                GetFax_id: '<node property>', // (1) define node properties
                GetFax_select: '<node property>', // (1) define node properties
                GetFax_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateFax()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateFax',
                UpdateFax_id: '<node property>', // (1) define node properties
                UpdateFax_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteFax()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteFax',
                DeleteFax_id: '<node property>', // (1) define node properties
                DeleteFax_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BulkFaxDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BulkFaxDelete',
                BulkFaxDelete_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFaxByNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFaxByNumber',
                GetFaxByNumber_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFaxServerSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFaxServerSettings',
                GetFaxServerSettings_select: '<node property>', // (1) define node properties
                GetFaxServerSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateFaxServerSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateFaxServerSettings',
                UpdateFaxServerSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFaxFilesSize()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFaxFilesSize',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CleanUpFax()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CleanUpFax',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFirewallState()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFirewallState',
                GetFirewallState_select: '<node property>', // (1) define node properties
                GetFirewallState_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetLastResult()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetLastResult',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle StartCheck()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'StartCheck',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle StopCheck()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'StopCheck',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFirmwareState()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFirmwareState',
                GetFirmwareState_select: '<node property>', // (1) define node properties
                GetFirmwareState_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CleanUp()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CleanUp',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListFxs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListFxs',
                ListFxs_top: '<node property>', // (1) define node properties
                ListFxs_skip: '<node property>', // (1) define node properties
                ListFxs_search: '<node property>', // (1) define node properties
                ListFxs_filter: '<node property>', // (1) define node properties
                ListFxs_count: '<node property>', // (1) define node properties
                ListFxs_orderby: '<node property>', // (1) define node properties
                ListFxs_select: '<node property>', // (1) define node properties
                ListFxs_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateFxs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateFxs',
                CreateFxs_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFxs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFxs',
                GetFxs_macAddress: '<node property>', // (1) define node properties
                GetFxs_select: '<node property>', // (1) define node properties
                GetFxs_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateFxs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateFxs',
                UpdateFxs_macAddress: '<node property>', // (1) define node properties
                UpdateFxs_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteFxs()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteFxs',
                DeleteFxs_macAddress: '<node property>', // (1) define node properties
                DeleteFxs_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListFxsTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListFxsTemplate',
                ListFxsTemplate_top: '<node property>', // (1) define node properties
                ListFxsTemplate_skip: '<node property>', // (1) define node properties
                ListFxsTemplate_search: '<node property>', // (1) define node properties
                ListFxsTemplate_filter: '<node property>', // (1) define node properties
                ListFxsTemplate_count: '<node property>', // (1) define node properties
                ListFxsTemplate_orderby: '<node property>', // (1) define node properties
                ListFxsTemplate_select: '<node property>', // (1) define node properties
                ListFxsTemplate_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateFxsTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateFxsTemplate',
                CreateFxsTemplate_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFxsTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFxsTemplate',
                GetFxsTemplate_id: '<node property>', // (1) define node properties
                GetFxsTemplate_select: '<node property>', // (1) define node properties
                GetFxsTemplate_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateFxsTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateFxsTemplate',
                UpdateFxsTemplate_id: '<node property>', // (1) define node properties
                UpdateFxsTemplate_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteFxsTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteFxsTemplate',
                DeleteFxsTemplate_id: '<node property>', // (1) define node properties
                DeleteFxsTemplate_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetGeneralSettingsForApps()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetGeneralSettingsForApps',
                GetGeneralSettingsForApps_select: '<node property>', // (1) define node properties
                GetGeneralSettingsForApps_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateGeneralSettingsForApps()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateGeneralSettingsForApps',
                UpdateGeneralSettingsForApps_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetGeneralSettingsForPbx()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetGeneralSettingsForPbx',
                GetGeneralSettingsForPbx_select: '<node property>', // (1) define node properties
                GetGeneralSettingsForPbx_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateGeneralSettingsForPbx()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateGeneralSettingsForPbx',
                UpdateGeneralSettingsForPbx_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetGoogleSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetGoogleSettings',
                GetGoogleSettings_select: '<node property>', // (1) define node properties
                GetGoogleSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateGoogleSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateGoogleSettings',
                UpdateGoogleSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetGroup',
                GetGroup_id: '<node property>', // (1) define node properties
                GetGroup_select: '<node property>', // (1) define node properties
                GetGroup_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateGroup',
                UpdateGroup_id: '<node property>', // (1) define node properties
                UpdateGroup_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteGroup',
                DeleteGroup_id: '<node property>', // (1) define node properties
                DeleteGroup_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListGroup',
                ListGroup_top: '<node property>', // (1) define node properties
                ListGroup_skip: '<node property>', // (1) define node properties
                ListGroup_search: '<node property>', // (1) define node properties
                ListGroup_filter: '<node property>', // (1) define node properties
                ListGroup_count: '<node property>', // (1) define node properties
                ListGroup_orderby: '<node property>', // (1) define node properties
                ListGroup_select: '<node property>', // (1) define node properties
                ListGroup_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateGroup',
                CreateGroup_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetRestrictions()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetRestrictions',
                GetRestrictions_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteCompanyByNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteCompanyByNumber',
                DeleteCompanyByNumber_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteCompanyById()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteCompanyById',
                DeleteCompanyById_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListMembers()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListMembers',
                ListMembers_id: '<node property>', // (1) define node properties
                ListMembers_top: '<node property>', // (1) define node properties
                ListMembers_skip: '<node property>', // (1) define node properties
                ListMembers_search: '<node property>', // (1) define node properties
                ListMembers_filter: '<node property>', // (1) define node properties
                ListMembers_count: '<node property>', // (1) define node properties
                ListMembers_orderby: '<node property>', // (1) define node properties
                ListMembers_select: '<node property>', // (1) define node properties
                ListMembers_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListRights()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListRights',
                ListRights_id: '<node property>', // (1) define node properties
                ListRights_top: '<node property>', // (1) define node properties
                ListRights_skip: '<node property>', // (1) define node properties
                ListRights_search: '<node property>', // (1) define node properties
                ListRights_filter: '<node property>', // (1) define node properties
                ListRights_count: '<node property>', // (1) define node properties
                ListRights_orderby: '<node property>', // (1) define node properties
                ListRights_select: '<node property>', // (1) define node properties
                ListRights_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ReplaceGroupLicenseKey()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ReplaceGroupLicenseKey',
                ReplaceGroupLicenseKey_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle LinkGroupPartner()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'LinkGroupPartner',
                LinkGroupPartner_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UnlinkGroupPartner()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UnlinkGroupPartner',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetHotelServices()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetHotelServices',
                GetHotelServices_select: '<node property>', // (1) define node properties
                GetHotelServices_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateHotelServices()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateHotelServices',
                UpdateHotelServices_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListInboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListInboundRule',
                ListInboundRule_top: '<node property>', // (1) define node properties
                ListInboundRule_skip: '<node property>', // (1) define node properties
                ListInboundRule_search: '<node property>', // (1) define node properties
                ListInboundRule_filter: '<node property>', // (1) define node properties
                ListInboundRule_count: '<node property>', // (1) define node properties
                ListInboundRule_orderby: '<node property>', // (1) define node properties
                ListInboundRule_select: '<node property>', // (1) define node properties
                ListInboundRule_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateInboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateInboundRule',
                CreateInboundRule_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetInboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetInboundRule',
                GetInboundRule_id: '<node property>', // (1) define node properties
                GetInboundRule_select: '<node property>', // (1) define node properties
                GetInboundRule_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateInboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateInboundRule',
                UpdateInboundRule_id: '<node property>', // (1) define node properties
                UpdateInboundRule_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteInboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteInboundRule',
                DeleteInboundRule_id: '<node property>', // (1) define node properties
                DeleteInboundRule_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BulkInboundRulesDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BulkInboundRulesDelete',
                BulkInboundRulesDelete_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetLicenseInfo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetLicenseInfo',
                GetLicenseInfo_select: '<node property>', // (1) define node properties
                GetLicenseInfo_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ReplaceLicenseKey()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ReplaceLicenseKey',
                ReplaceLicenseKey_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle EditLicenseInfo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'EditLicenseInfo',
                EditLicenseInfo_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle RefreshLicenseStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'RefreshLicenseStatus',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetLicenseStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetLicenseStatus',
                GetLicenseStatus_select: '<node property>', // (1) define node properties
                GetLicenseStatus_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UnlinkPartner()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UnlinkPartner',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle LinkPartner()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'LinkPartner',
                LinkPartner_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle PartnerInfo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'PartnerInfo',
                PartnerInfo_resellerId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetLoggingSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetLoggingSettings',
                GetLoggingSettings_select: '<node property>', // (1) define node properties
                GetLoggingSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateLoggingSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateLoggingSettings',
                UpdateLoggingSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle TestSubscription()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'TestSubscription',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMicrosoft365Integration()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMicrosoft365Integration',
                GetMicrosoft365Integration_select: '<node property>', // (1) define node properties
                GetMicrosoft365Integration_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateMicrosoft365Integration()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateMicrosoft365Integration',
                UpdateMicrosoft365Integration_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle AuthorizePresence()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'AuthorizePresence',
                AuthorizePresence_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle TestPresence()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'TestPresence',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeauthorizePresence()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeauthorizePresence',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMicrosoftAccessToken()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMicrosoftAccessToken',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMicrosoft365Directory()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMicrosoft365Directory',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetUsers()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetUsers',
                GetUsers_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetUsersByPrincipalNames()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetUsersByPrincipalNames',
                GetUsersByPrincipalNames_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMicrosoft365TeamsIntegration()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMicrosoft365TeamsIntegration',
                GetMicrosoft365TeamsIntegration_select: '<node property>', // (1) define node properties
                GetMicrosoft365TeamsIntegration_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateMicrosoft365TeamsIntegration()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateMicrosoft365TeamsIntegration',
                UpdateMicrosoft365TeamsIntegration_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CheckFqdnRecord()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CheckFqdnRecord',
                CheckFqdnRecord_fqdn: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetDialPlanScript()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetDialPlanScript',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMapUsersScript()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMapUsersScript',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CheckMapUsersScript()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CheckMapUsersScript',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMusicOnHoldSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMusicOnHoldSettings',
                GetMusicOnHoldSettings_select: '<node property>', // (1) define node properties
                GetMusicOnHoldSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateMusicOnHoldSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateMusicOnHoldSettings',
                UpdateMusicOnHoldSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMyGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMyGroup',
                GetMyGroup_select: '<node property>', // (1) define node properties
                GetMyGroup_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateMyGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateMyGroup',
                UpdateMyGroup_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListMyGroupMembers()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListMyGroupMembers',
                ListMyGroupMembers_top: '<node property>', // (1) define node properties
                ListMyGroupMembers_skip: '<node property>', // (1) define node properties
                ListMyGroupMembers_search: '<node property>', // (1) define node properties
                ListMyGroupMembers_filter: '<node property>', // (1) define node properties
                ListMyGroupMembers_count: '<node property>', // (1) define node properties
                ListMyGroupMembers_orderby: '<node property>', // (1) define node properties
                ListMyGroupMembers_select: '<node property>', // (1) define node properties
                ListMyGroupMembers_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListMyGroupRights()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListMyGroupRights',
                ListMyGroupRights_top: '<node property>', // (1) define node properties
                ListMyGroupRights_skip: '<node property>', // (1) define node properties
                ListMyGroupRights_search: '<node property>', // (1) define node properties
                ListMyGroupRights_filter: '<node property>', // (1) define node properties
                ListMyGroupRights_count: '<node property>', // (1) define node properties
                ListMyGroupRights_orderby: '<node property>', // (1) define node properties
                ListMyGroupRights_select: '<node property>', // (1) define node properties
                ListMyGroupRights_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMyGroupRestrictions()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMyGroupRestrictions',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ReplaceMyGroupLicenseKey()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ReplaceMyGroupLicenseKey',
                ReplaceMyGroupLicenseKey_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMyGroupPartnerInfo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMyGroupPartnerInfo',
                GetMyGroupPartnerInfo_resellerId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UnlinkMyGroupPartner()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UnlinkMyGroupPartner',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle LinkMyGroupPartner()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'LinkMyGroupPartner',
                LinkMyGroupPartner_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListRefreshToken()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListRefreshToken',
                ListRefreshToken_top: '<node property>', // (1) define node properties
                ListRefreshToken_skip: '<node property>', // (1) define node properties
                ListRefreshToken_search: '<node property>', // (1) define node properties
                ListRefreshToken_filter: '<node property>', // (1) define node properties
                ListRefreshToken_count: '<node property>', // (1) define node properties
                ListRefreshToken_orderby: '<node property>', // (1) define node properties
                ListRefreshToken_select: '<node property>', // (1) define node properties
                ListRefreshToken_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle RevokeToken()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'RevokeToken',
                RevokeToken_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMyUser()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMyUser',
                GetMyUser_select: '<node property>', // (1) define node properties
                GetMyUser_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateMyUser()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateMyUser',
                UpdateMyUser_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListMyUserGroups()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListMyUserGroups',
                ListMyUserGroups_top: '<node property>', // (1) define node properties
                ListMyUserGroups_skip: '<node property>', // (1) define node properties
                ListMyUserGroups_search: '<node property>', // (1) define node properties
                ListMyUserGroups_filter: '<node property>', // (1) define node properties
                ListMyUserGroups_count: '<node property>', // (1) define node properties
                ListMyUserGroups_orderby: '<node property>', // (1) define node properties
                ListMyUserGroups_select: '<node property>', // (1) define node properties
                ListMyUserGroups_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListMyUserForwardingProfiles()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListMyUserForwardingProfiles',
                ListMyUserForwardingProfiles_top: '<node property>', // (1) define node properties
                ListMyUserForwardingProfiles_skip: '<node property>', // (1) define node properties
                ListMyUserForwardingProfiles_search: '<node property>', // (1) define node properties
                ListMyUserForwardingProfiles_filter: '<node property>', // (1) define node properties
                ListMyUserForwardingProfiles_count: '<node property>', // (1) define node properties
                ListMyUserForwardingProfiles_orderby: '<node property>', // (1) define node properties
                ListMyUserForwardingProfiles_select: '<node property>', // (1) define node properties
                ListMyUserForwardingProfiles_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListMyUserGreetings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListMyUserGreetings',
                ListMyUserGreetings_top: '<node property>', // (1) define node properties
                ListMyUserGreetings_skip: '<node property>', // (1) define node properties
                ListMyUserGreetings_search: '<node property>', // (1) define node properties
                ListMyUserGreetings_filter: '<node property>', // (1) define node properties
                ListMyUserGreetings_count: '<node property>', // (1) define node properties
                ListMyUserGreetings_orderby: '<node property>', // (1) define node properties
                ListMyUserGreetings_select: '<node property>', // (1) define node properties
                ListMyUserGreetings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle MyUserGenerateProvLink()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'MyUserGenerateProvLink',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListNetworkInterface()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListNetworkInterface',
                ListNetworkInterface_top: '<node property>', // (1) define node properties
                ListNetworkInterface_skip: '<node property>', // (1) define node properties
                ListNetworkInterface_search: '<node property>', // (1) define node properties
                ListNetworkInterface_filter: '<node property>', // (1) define node properties
                ListNetworkInterface_count: '<node property>', // (1) define node properties
                ListNetworkInterface_orderby: '<node property>', // (1) define node properties
                ListNetworkInterface_select: '<node property>', // (1) define node properties
                ListNetworkInterface_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetNetworkSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetNetworkSettings',
                GetNetworkSettings_select: '<node property>', // (1) define node properties
                GetNetworkSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateNetworkSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateNetworkSettings',
                UpdateNetworkSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetIfaces()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetIfaces',
                GetIfaces_top: '<node property>', // (1) define node properties
                GetIfaces_skip: '<node property>', // (1) define node properties
                GetIfaces_search: '<node property>', // (1) define node properties
                GetIfaces_filter: '<node property>', // (1) define node properties
                GetIfaces_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetNotificationSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetNotificationSettings',
                GetNotificationSettings_select: '<node property>', // (1) define node properties
                GetNotificationSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateNotificationSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateNotificationSettings',
                UpdateNotificationSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle TestEmail()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'TestEmail',
                TestEmail_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetOfficeHours()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetOfficeHours',
                GetOfficeHours_select: '<node property>', // (1) define node properties
                GetOfficeHours_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateOfficeHours()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateOfficeHours',
                UpdateOfficeHours_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetOutboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetOutboundRule',
                GetOutboundRule_id: '<node property>', // (1) define node properties
                GetOutboundRule_select: '<node property>', // (1) define node properties
                GetOutboundRule_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateOutboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateOutboundRule',
                UpdateOutboundRule_id: '<node property>', // (1) define node properties
                UpdateOutboundRule_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteOutboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteOutboundRule',
                DeleteOutboundRule_id: '<node property>', // (1) define node properties
                DeleteOutboundRule_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListOutboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListOutboundRule',
                ListOutboundRule_top: '<node property>', // (1) define node properties
                ListOutboundRule_skip: '<node property>', // (1) define node properties
                ListOutboundRule_search: '<node property>', // (1) define node properties
                ListOutboundRule_filter: '<node property>', // (1) define node properties
                ListOutboundRule_count: '<node property>', // (1) define node properties
                ListOutboundRule_orderby: '<node property>', // (1) define node properties
                ListOutboundRule_select: '<node property>', // (1) define node properties
                ListOutboundRule_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateOutboundRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateOutboundRule',
                CreateOutboundRule_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetEmergencyOutboundRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetEmergencyOutboundRules',
                GetEmergencyOutboundRules_top: '<node property>', // (1) define node properties
                GetEmergencyOutboundRules_skip: '<node property>', // (1) define node properties
                GetEmergencyOutboundRules_search: '<node property>', // (1) define node properties
                GetEmergencyOutboundRules_filter: '<node property>', // (1) define node properties
                GetEmergencyOutboundRules_count: '<node property>', // (1) define node properties
                GetEmergencyOutboundRules_select: '<node property>', // (1) define node properties
                GetEmergencyOutboundRules_orderby: '<node property>', // (1) define node properties
                GetEmergencyOutboundRules_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Purge()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Purge',
                Purge_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle MoveUpDown()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'MoveUpDown',
                MoveUpDown_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetParameterByName()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetParameterByName',
                GetParameterByName_name: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListParameter()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListParameter',
                ListParameter_top: '<node property>', // (1) define node properties
                ListParameter_skip: '<node property>', // (1) define node properties
                ListParameter_search: '<node property>', // (1) define node properties
                ListParameter_filter: '<node property>', // (1) define node properties
                ListParameter_count: '<node property>', // (1) define node properties
                ListParameter_orderby: '<node property>', // (1) define node properties
                ListParameter_select: '<node property>', // (1) define node properties
                ListParameter_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateParameter()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateParameter',
                CreateParameter_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetParameter()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetParameter',
                GetParameter_id: '<node property>', // (1) define node properties
                GetParameter_select: '<node property>', // (1) define node properties
                GetParameter_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateParameter()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateParameter',
                UpdateParameter_id: '<node property>', // (1) define node properties
                UpdateParameter_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteParameter()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteParameter',
                DeleteParameter_id: '<node property>', // (1) define node properties
                DeleteParameter_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListParkingGroups()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListParkingGroups',
                ListParkingGroups_id: '<node property>', // (1) define node properties
                ListParkingGroups_top: '<node property>', // (1) define node properties
                ListParkingGroups_skip: '<node property>', // (1) define node properties
                ListParkingGroups_search: '<node property>', // (1) define node properties
                ListParkingGroups_filter: '<node property>', // (1) define node properties
                ListParkingGroups_count: '<node property>', // (1) define node properties
                ListParkingGroups_orderby: '<node property>', // (1) define node properties
                ListParkingGroups_select: '<node property>', // (1) define node properties
                ListParkingGroups_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetByNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetByNumber',
                GetByNumber_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListParking()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListParking',
                ListParking_top: '<node property>', // (1) define node properties
                ListParking_skip: '<node property>', // (1) define node properties
                ListParking_search: '<node property>', // (1) define node properties
                ListParking_filter: '<node property>', // (1) define node properties
                ListParking_count: '<node property>', // (1) define node properties
                ListParking_orderby: '<node property>', // (1) define node properties
                ListParking_select: '<node property>', // (1) define node properties
                ListParking_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateParking()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateParking',
                CreateParking_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetParking()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetParking',
                GetParking_id: '<node property>', // (1) define node properties
                GetParking_select: '<node property>', // (1) define node properties
                GetParking_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateParking()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateParking',
                UpdateParking_id: '<node property>', // (1) define node properties
                UpdateParking_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteParking()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteParking',
                DeleteParking_id: '<node property>', // (1) define node properties
                DeleteParking_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListPeer()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListPeer',
                ListPeer_top: '<node property>', // (1) define node properties
                ListPeer_skip: '<node property>', // (1) define node properties
                ListPeer_search: '<node property>', // (1) define node properties
                ListPeer_filter: '<node property>', // (1) define node properties
                ListPeer_count: '<node property>', // (1) define node properties
                ListPeer_orderby: '<node property>', // (1) define node properties
                ListPeer_select: '<node property>', // (1) define node properties
                ListPeer_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPeerByNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPeerByNumber',
                GetPeerByNumber_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetReportPeers()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetReportPeers',
                GetReportPeers_top: '<node property>', // (1) define node properties
                GetReportPeers_skip: '<node property>', // (1) define node properties
                GetReportPeers_search: '<node property>', // (1) define node properties
                GetReportPeers_filter: '<node property>', // (1) define node properties
                GetReportPeers_count: '<node property>', // (1) define node properties
                GetReportPeers_select: '<node property>', // (1) define node properties
                GetReportPeers_orderby: '<node property>', // (1) define node properties
                GetReportPeers_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPhoneBookSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPhoneBookSettings',
                GetPhoneBookSettings_select: '<node property>', // (1) define node properties
                GetPhoneBookSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdatePhoneBookSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdatePhoneBookSettings',
                UpdatePhoneBookSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListPhoneLogo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListPhoneLogo',
                ListPhoneLogo_top: '<node property>', // (1) define node properties
                ListPhoneLogo_skip: '<node property>', // (1) define node properties
                ListPhoneLogo_search: '<node property>', // (1) define node properties
                ListPhoneLogo_filter: '<node property>', // (1) define node properties
                ListPhoneLogo_count: '<node property>', // (1) define node properties
                ListPhoneLogo_orderby: '<node property>', // (1) define node properties
                ListPhoneLogo_select: '<node property>', // (1) define node properties
                ListPhoneLogo_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeletePhoneLogo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeletePhoneLogo',
                DeletePhoneLogo_filename: '<node property>', // (1) define node properties
                DeletePhoneLogo_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPhonesSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPhonesSettings',
                GetPhonesSettings_select: '<node property>', // (1) define node properties
                GetPhonesSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdatePhonesSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdatePhonesSettings',
                UpdatePhonesSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListPhoneTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListPhoneTemplate',
                ListPhoneTemplate_top: '<node property>', // (1) define node properties
                ListPhoneTemplate_skip: '<node property>', // (1) define node properties
                ListPhoneTemplate_search: '<node property>', // (1) define node properties
                ListPhoneTemplate_filter: '<node property>', // (1) define node properties
                ListPhoneTemplate_count: '<node property>', // (1) define node properties
                ListPhoneTemplate_orderby: '<node property>', // (1) define node properties
                ListPhoneTemplate_select: '<node property>', // (1) define node properties
                ListPhoneTemplate_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreatePhoneTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreatePhoneTemplate',
                CreatePhoneTemplate_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPhoneTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPhoneTemplate',
                GetPhoneTemplate_id: '<node property>', // (1) define node properties
                GetPhoneTemplate_select: '<node property>', // (1) define node properties
                GetPhoneTemplate_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdatePhoneTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdatePhoneTemplate',
                UpdatePhoneTemplate_id: '<node property>', // (1) define node properties
                UpdatePhoneTemplate_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeletePhoneTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeletePhoneTemplate',
                DeletePhoneTemplate_id: '<node property>', // (1) define node properties
                DeletePhoneTemplate_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListPlaylist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListPlaylist',
                ListPlaylist_top: '<node property>', // (1) define node properties
                ListPlaylist_skip: '<node property>', // (1) define node properties
                ListPlaylist_search: '<node property>', // (1) define node properties
                ListPlaylist_filter: '<node property>', // (1) define node properties
                ListPlaylist_count: '<node property>', // (1) define node properties
                ListPlaylist_orderby: '<node property>', // (1) define node properties
                ListPlaylist_select: '<node property>', // (1) define node properties
                ListPlaylist_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreatePlaylist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreatePlaylist',
                CreatePlaylist_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPlaylist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPlaylist',
                GetPlaylist_name: '<node property>', // (1) define node properties
                GetPlaylist_select: '<node property>', // (1) define node properties
                GetPlaylist_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdatePlaylist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdatePlaylist',
                UpdatePlaylist_name: '<node property>', // (1) define node properties
                UpdatePlaylist_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeletePlaylist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeletePlaylist',
                DeletePlaylist_name: '<node property>', // (1) define node properties
                DeletePlaylist_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeletePlaylistFile()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeletePlaylistFile',
                DeletePlaylistFile_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadPlaylistFile()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadPlaylistFile',
                DownloadPlaylistFile_playlistKey: '<node property>', // (1) define node properties
                DownloadPlaylistFile_fileName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListPromptSet()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListPromptSet',
                ListPromptSet_top: '<node property>', // (1) define node properties
                ListPromptSet_skip: '<node property>', // (1) define node properties
                ListPromptSet_search: '<node property>', // (1) define node properties
                ListPromptSet_filter: '<node property>', // (1) define node properties
                ListPromptSet_count: '<node property>', // (1) define node properties
                ListPromptSet_orderby: '<node property>', // (1) define node properties
                ListPromptSet_select: '<node property>', // (1) define node properties
                ListPromptSet_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPromptSet()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPromptSet',
                GetPromptSet_id: '<node property>', // (1) define node properties
                GetPromptSet_select: '<node property>', // (1) define node properties
                GetPromptSet_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdatePromptSet()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdatePromptSet',
                UpdatePromptSet_id: '<node property>', // (1) define node properties
                UpdatePromptSet_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeletePromptSet()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeletePromptSet',
                DeletePromptSet_id: '<node property>', // (1) define node properties
                DeletePromptSet_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetActive()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetActive',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListPrompts()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListPrompts',
                ListPrompts_id: '<node property>', // (1) define node properties
                ListPrompts_top: '<node property>', // (1) define node properties
                ListPrompts_skip: '<node property>', // (1) define node properties
                ListPrompts_search: '<node property>', // (1) define node properties
                ListPrompts_filter: '<node property>', // (1) define node properties
                ListPrompts_count: '<node property>', // (1) define node properties
                ListPrompts_orderby: '<node property>', // (1) define node properties
                ListPrompts_select: '<node property>', // (1) define node properties
                ListPrompts_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetActive()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetActive',
                SetActive_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetAlternatePronunciation()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetAlternatePronunciation',
                SetAlternatePronunciation_id: '<node property>', // (1) define node properties
                SetAlternatePronunciation_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Copy()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Copy',
                Copy_id: '<node property>', // (1) define node properties
                Copy_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle PlayPrompt()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'PlayPrompt',
                PlayPrompt_id: '<node property>', // (1) define node properties
                PlayPrompt_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle RecordPrompt()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'RecordPrompt',
                RecordPrompt_id: '<node property>', // (1) define node properties
                RecordPrompt_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle PurgeCalls()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'PurgeCalls',
                PurgeCalls_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle PurgeChats()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'PurgeChats',
                PurgeChats_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListAgents()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListAgents',
                ListAgents_id: '<node property>', // (1) define node properties
                ListAgents_top: '<node property>', // (1) define node properties
                ListAgents_skip: '<node property>', // (1) define node properties
                ListAgents_search: '<node property>', // (1) define node properties
                ListAgents_filter: '<node property>', // (1) define node properties
                ListAgents_count: '<node property>', // (1) define node properties
                ListAgents_orderby: '<node property>', // (1) define node properties
                ListAgents_select: '<node property>', // (1) define node properties
                ListAgents_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListManagers()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListManagers',
                ListManagers_id: '<node property>', // (1) define node properties
                ListManagers_top: '<node property>', // (1) define node properties
                ListManagers_skip: '<node property>', // (1) define node properties
                ListManagers_search: '<node property>', // (1) define node properties
                ListManagers_filter: '<node property>', // (1) define node properties
                ListManagers_count: '<node property>', // (1) define node properties
                ListManagers_orderby: '<node property>', // (1) define node properties
                ListManagers_select: '<node property>', // (1) define node properties
                ListManagers_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ResetQueueStatistics()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ResetQueueStatistics',
                ResetQueueStatistics_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFirstAvailableQueueNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFirstAvailableQueueNumber',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueueByNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueueByNumber',
                GetQueueByNumber_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListQueue()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListQueue',
                ListQueue_top: '<node property>', // (1) define node properties
                ListQueue_skip: '<node property>', // (1) define node properties
                ListQueue_search: '<node property>', // (1) define node properties
                ListQueue_filter: '<node property>', // (1) define node properties
                ListQueue_count: '<node property>', // (1) define node properties
                ListQueue_orderby: '<node property>', // (1) define node properties
                ListQueue_select: '<node property>', // (1) define node properties
                ListQueue_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateQueue()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateQueue',
                CreateQueue_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueue()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueue',
                GetQueue_id: '<node property>', // (1) define node properties
                GetQueue_select: '<node property>', // (1) define node properties
                GetQueue_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateQueue()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateQueue',
                UpdateQueue_id: '<node property>', // (1) define node properties
                UpdateQueue_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteQueue()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteQueue',
                DeleteQueue_id: '<node property>', // (1) define node properties
                DeleteQueue_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListForwards()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListForwards',
                ListForwards_id: '<node property>', // (1) define node properties
                ListForwards_top: '<node property>', // (1) define node properties
                ListForwards_skip: '<node property>', // (1) define node properties
                ListForwards_search: '<node property>', // (1) define node properties
                ListForwards_filter: '<node property>', // (1) define node properties
                ListForwards_count: '<node property>', // (1) define node properties
                ListForwards_orderby: '<node property>', // (1) define node properties
                ListForwards_select: '<node property>', // (1) define node properties
                ListForwards_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFirstAvailableReceptionistNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFirstAvailableReceptionistNumber',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetReceptionistByNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetReceptionistByNumber',
                GetReceptionistByNumber_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListReceptionist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListReceptionist',
                ListReceptionist_top: '<node property>', // (1) define node properties
                ListReceptionist_skip: '<node property>', // (1) define node properties
                ListReceptionist_search: '<node property>', // (1) define node properties
                ListReceptionist_filter: '<node property>', // (1) define node properties
                ListReceptionist_count: '<node property>', // (1) define node properties
                ListReceptionist_orderby: '<node property>', // (1) define node properties
                ListReceptionist_select: '<node property>', // (1) define node properties
                ListReceptionist_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateReceptionist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateReceptionist',
                CreateReceptionist_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetReceptionist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetReceptionist',
                GetReceptionist_id: '<node property>', // (1) define node properties
                GetReceptionist_select: '<node property>', // (1) define node properties
                GetReceptionist_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateReceptionist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateReceptionist',
                UpdateReceptionist_id: '<node property>', // (1) define node properties
                UpdateReceptionist_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteReceptionist()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteReceptionist',
                DeleteReceptionist_id: '<node property>', // (1) define node properties
                DeleteReceptionist_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListRecording()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListRecording',
                ListRecording_top: '<node property>', // (1) define node properties
                ListRecording_skip: '<node property>', // (1) define node properties
                ListRecording_search: '<node property>', // (1) define node properties
                ListRecording_filter: '<node property>', // (1) define node properties
                ListRecording_count: '<node property>', // (1) define node properties
                ListRecording_orderby: '<node property>', // (1) define node properties
                ListRecording_select: '<node property>', // (1) define node properties
                ListRecording_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadRecording()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadRecording',
                DownloadRecording_recId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetRecordingRepositorySettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetRecordingRepositorySettings',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetRecordingRepositorySettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetRecordingRepositorySettings',
                SetRecordingRepositorySettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetRecordingSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetRecordingSettings',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetRecordingSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetRecordingSettings',
                SetRecordingSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle PurgeLocal()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'PurgeLocal',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle PurgeArchive()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'PurgeArchive',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Archive()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Archive',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BulkRecordingsDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BulkRecordingsDelete',
                BulkRecordingsDelete_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BulkRecordingsArchive()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BulkRecordingsArchive',
                BulkRecordingsArchive_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetAbandonedChatsStatisticsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetAbandonedChatsStatisticsData',
                GetAbandonedChatsStatisticsData_queueDnStr: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_startDt: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_endDt: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_participantType: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_top: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_skip: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_search: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_filter: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_count: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_select: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_orderby: '<node property>', // (1) define node properties
                GetAbandonedChatsStatisticsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadAbandonedChatsStatistics()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadAbandonedChatsStatistics',
                DownloadAbandonedChatsStatistics_queueDnStr: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_startDt: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_endDt: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_participantType: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_clientTimeZone: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_top: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_skip: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_search: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_filter: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_count: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_select: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_orderby: '<node property>', // (1) define node properties
                DownloadAbandonedChatsStatistics_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetAbandonedQueueCallsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetAbandonedQueueCallsData',
                GetAbandonedQueueCallsData_periodFrom: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_periodTo: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_queueDns: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_waitInterval: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_top: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_skip: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_search: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_filter: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_count: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_select: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_orderby: '<node property>', // (1) define node properties
                GetAbandonedQueueCallsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadAbandonedQueueCalls()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadAbandonedQueueCalls',
                DownloadAbandonedQueueCalls_periodFrom: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_periodTo: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_queueDns: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_waitInterval: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_clientTimeZone: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_top: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_skip: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_search: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_filter: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_count: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_select: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_orderby: '<node property>', // (1) define node properties
                DownloadAbandonedQueueCalls_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetAgentLoginHistoryData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetAgentLoginHistoryData',
                GetAgentLoginHistoryData_clientTimeZone: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_startDt: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_endDt: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_queueDnStr: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_agentDnStr: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_top: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_skip: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_search: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_filter: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_count: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_select: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_orderby: '<node property>', // (1) define node properties
                GetAgentLoginHistoryData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadAgentLoginHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadAgentLoginHistory',
                DownloadAgentLoginHistory_clientTimeZone: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_startDt: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_endDt: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_queueDnStr: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_agentDnStr: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_top: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_skip: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_search: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_filter: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_count: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_select: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_orderby: '<node property>', // (1) define node properties
                DownloadAgentLoginHistory_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetAgentsInQueueStatisticsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetAgentsInQueueStatisticsData',
                GetAgentsInQueueStatisticsData_queueDnStr: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_startDt: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_endDt: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_waitInterval: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_top: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_skip: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_search: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_filter: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_count: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_select: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_orderby: '<node property>', // (1) define node properties
                GetAgentsInQueueStatisticsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadAgentsInQueueStatistics()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadAgentsInQueueStatistics',
                DownloadAgentsInQueueStatistics_queueDnStr: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_startDt: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_endDt: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_waitInterval: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_top: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_skip: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_search: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_filter: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_count: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_select: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_orderby: '<node property>', // (1) define node properties
                DownloadAgentsInQueueStatistics_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetAuditLogData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetAuditLogData',
                GetAuditLogData_top: '<node property>', // (1) define node properties
                GetAuditLogData_skip: '<node property>', // (1) define node properties
                GetAuditLogData_search: '<node property>', // (1) define node properties
                GetAuditLogData_filter: '<node property>', // (1) define node properties
                GetAuditLogData_count: '<node property>', // (1) define node properties
                GetAuditLogData_select: '<node property>', // (1) define node properties
                GetAuditLogData_orderby: '<node property>', // (1) define node properties
                GetAuditLogData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadAuditLog()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadAuditLog',
                DownloadAuditLog_clientTimeZone: '<node property>', // (1) define node properties
                DownloadAuditLog_top: '<node property>', // (1) define node properties
                DownloadAuditLog_skip: '<node property>', // (1) define node properties
                DownloadAuditLog_search: '<node property>', // (1) define node properties
                DownloadAuditLog_filter: '<node property>', // (1) define node properties
                DownloadAuditLog_count: '<node property>', // (1) define node properties
                DownloadAuditLog_select: '<node property>', // (1) define node properties
                DownloadAuditLog_orderby: '<node property>', // (1) define node properties
                DownloadAuditLog_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetAverageQueueWaitingTimeData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetAverageQueueWaitingTimeData',
                GetAverageQueueWaitingTimeData_chartDate: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_chartBy: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_queueDnStr: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_waitInterval: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_clientTimeZone: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_top: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_skip: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_search: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_filter: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_count: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_select: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_orderby: '<node property>', // (1) define node properties
                GetAverageQueueWaitingTimeData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadAverageQueueWaitingTimeReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadAverageQueueWaitingTimeReport',
                DownloadAverageQueueWaitingTimeReport_chartDate: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_chartBy: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_queueDnStr: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_waitInterval: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_clientTimeZone: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_top: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_skip: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_search: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_filter: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_count: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_select: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_orderby: '<node property>', // (1) define node properties
                DownloadAverageQueueWaitingTimeReport_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetBreachesSlaData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetBreachesSlaData',
                GetBreachesSlaData_queueDnStr: '<node property>', // (1) define node properties
                GetBreachesSlaData_startDt: '<node property>', // (1) define node properties
                GetBreachesSlaData_endDt: '<node property>', // (1) define node properties
                GetBreachesSlaData_waitInterval: '<node property>', // (1) define node properties
                GetBreachesSlaData_top: '<node property>', // (1) define node properties
                GetBreachesSlaData_skip: '<node property>', // (1) define node properties
                GetBreachesSlaData_search: '<node property>', // (1) define node properties
                GetBreachesSlaData_filter: '<node property>', // (1) define node properties
                GetBreachesSlaData_count: '<node property>', // (1) define node properties
                GetBreachesSlaData_select: '<node property>', // (1) define node properties
                GetBreachesSlaData_orderby: '<node property>', // (1) define node properties
                GetBreachesSlaData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadBreachesSla()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadBreachesSla',
                DownloadBreachesSla_queueDnStr: '<node property>', // (1) define node properties
                DownloadBreachesSla_startDt: '<node property>', // (1) define node properties
                DownloadBreachesSla_endDt: '<node property>', // (1) define node properties
                DownloadBreachesSla_waitInterval: '<node property>', // (1) define node properties
                DownloadBreachesSla_clientTimeZone: '<node property>', // (1) define node properties
                DownloadBreachesSla_top: '<node property>', // (1) define node properties
                DownloadBreachesSla_skip: '<node property>', // (1) define node properties
                DownloadBreachesSla_search: '<node property>', // (1) define node properties
                DownloadBreachesSla_filter: '<node property>', // (1) define node properties
                DownloadBreachesSla_count: '<node property>', // (1) define node properties
                DownloadBreachesSla_select: '<node property>', // (1) define node properties
                DownloadBreachesSla_orderby: '<node property>', // (1) define node properties
                DownloadBreachesSla_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCallCostByExtensionGroupData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCallCostByExtensionGroupData',
                GetCallCostByExtensionGroupData_periodFrom: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_periodTo: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_groupFilter: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_callClass: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_top: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_skip: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_search: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_filter: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_count: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_select: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_orderby: '<node property>', // (1) define node properties
                GetCallCostByExtensionGroupData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadCallCostByExtensionGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadCallCostByExtensionGroup',
                DownloadCallCostByExtensionGroup_periodFrom: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_periodTo: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_groupFilter: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_callClass: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_clientTimeZone: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_top: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_skip: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_search: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_filter: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_count: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_select: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_orderby: '<node property>', // (1) define node properties
                DownloadCallCostByExtensionGroup_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCallDistributionData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCallDistributionData',
                GetCallDistributionData_chartDate: '<node property>', // (1) define node properties
                GetCallDistributionData_chartBy: '<node property>', // (1) define node properties
                GetCallDistributionData_includeInternalCalls: '<node property>', // (1) define node properties
                GetCallDistributionData_includeQueueCalls: '<node property>', // (1) define node properties
                GetCallDistributionData_queueDnStr: '<node property>', // (1) define node properties
                GetCallDistributionData_groupStr: '<node property>', // (1) define node properties
                GetCallDistributionData_clientTimeZone: '<node property>', // (1) define node properties
                GetCallDistributionData_waitInterval: '<node property>', // (1) define node properties
                GetCallDistributionData_top: '<node property>', // (1) define node properties
                GetCallDistributionData_skip: '<node property>', // (1) define node properties
                GetCallDistributionData_search: '<node property>', // (1) define node properties
                GetCallDistributionData_filter: '<node property>', // (1) define node properties
                GetCallDistributionData_count: '<node property>', // (1) define node properties
                GetCallDistributionData_select: '<node property>', // (1) define node properties
                GetCallDistributionData_orderby: '<node property>', // (1) define node properties
                GetCallDistributionData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadCallDistributionReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadCallDistributionReport',
                DownloadCallDistributionReport_chartDate: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_chartBy: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_includeInternalCalls: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_includeQueueCalls: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_queueDnStr: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_groupStr: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_clientTimeZone: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_waitInterval: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_top: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_skip: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_search: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_filter: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_count: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_select: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_orderby: '<node property>', // (1) define node properties
                DownloadCallDistributionReport_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCallLogData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCallLogData',
                GetCallLogData_periodFrom: '<node property>', // (1) define node properties
                GetCallLogData_periodTo: '<node property>', // (1) define node properties
                GetCallLogData_sourceType: '<node property>', // (1) define node properties
                GetCallLogData_sourceFilter: '<node property>', // (1) define node properties
                GetCallLogData_destinationType: '<node property>', // (1) define node properties
                GetCallLogData_destinationFilter: '<node property>', // (1) define node properties
                GetCallLogData_callsType: '<node property>', // (1) define node properties
                GetCallLogData_callTimeFilterType: '<node property>', // (1) define node properties
                GetCallLogData_callTimeFilterFrom: '<node property>', // (1) define node properties
                GetCallLogData_callTimeFilterTo: '<node property>', // (1) define node properties
                GetCallLogData_hidePcalls: '<node property>', // (1) define node properties
                GetCallLogData_top: '<node property>', // (1) define node properties
                GetCallLogData_skip: '<node property>', // (1) define node properties
                GetCallLogData_search: '<node property>', // (1) define node properties
                GetCallLogData_filter: '<node property>', // (1) define node properties
                GetCallLogData_count: '<node property>', // (1) define node properties
                GetCallLogData_select: '<node property>', // (1) define node properties
                GetCallLogData_orderby: '<node property>', // (1) define node properties
                GetCallLogData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadCallLog()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadCallLog',
                DownloadCallLog_periodFrom: '<node property>', // (1) define node properties
                DownloadCallLog_periodTo: '<node property>', // (1) define node properties
                DownloadCallLog_sourceType: '<node property>', // (1) define node properties
                DownloadCallLog_sourceFilter: '<node property>', // (1) define node properties
                DownloadCallLog_destinationType: '<node property>', // (1) define node properties
                DownloadCallLog_destinationFilter: '<node property>', // (1) define node properties
                DownloadCallLog_callsType: '<node property>', // (1) define node properties
                DownloadCallLog_callTimeFilterType: '<node property>', // (1) define node properties
                DownloadCallLog_callTimeFilterFrom: '<node property>', // (1) define node properties
                DownloadCallLog_callTimeFilterTo: '<node property>', // (1) define node properties
                DownloadCallLog_hidePcalls: '<node property>', // (1) define node properties
                DownloadCallLog_clientTimeZone: '<node property>', // (1) define node properties
                DownloadCallLog_top: '<node property>', // (1) define node properties
                DownloadCallLog_skip: '<node property>', // (1) define node properties
                DownloadCallLog_search: '<node property>', // (1) define node properties
                DownloadCallLog_filter: '<node property>', // (1) define node properties
                DownloadCallLog_count: '<node property>', // (1) define node properties
                DownloadCallLog_select: '<node property>', // (1) define node properties
                DownloadCallLog_orderby: '<node property>', // (1) define node properties
                DownloadCallLog_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetCallQualityReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetCallQualityReport',
                GetCallQualityReport_callId: '<node property>', // (1) define node properties
                GetCallQualityReport_srcNumber: '<node property>', // (1) define node properties
                GetCallQualityReport_dstNumber: '<node property>', // (1) define node properties
                GetCallQualityReport_srcCallerId: '<node property>', // (1) define node properties
                GetCallQualityReport_dstCallerId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetDetailedQueueStatisticsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetDetailedQueueStatisticsData',
                GetDetailedQueueStatisticsData_queueDnStr: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_startDt: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_endDt: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_waitInterval: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_top: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_skip: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_search: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_filter: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_count: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_select: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_orderby: '<node property>', // (1) define node properties
                GetDetailedQueueStatisticsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadDetailedQueueStatistics()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadDetailedQueueStatistics',
                DownloadDetailedQueueStatistics_queueDnStr: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_startDt: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_endDt: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_waitInterval: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_top: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_skip: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_search: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_filter: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_count: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_select: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_orderby: '<node property>', // (1) define node properties
                DownloadDetailedQueueStatistics_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetExtensionsStatisticsByRingGroupsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetExtensionsStatisticsByRingGroupsData',
                GetExtensionsStatisticsByRingGroupsData_periodFrom: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_periodTo: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_ringGroupDns: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_top: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_skip: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_search: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_filter: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_count: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_select: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_orderby: '<node property>', // (1) define node properties
                GetExtensionsStatisticsByRingGroupsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadExtensionsStatisticsByRingGroups()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadExtensionsStatisticsByRingGroups',
                DownloadExtensionsStatisticsByRingGroups_periodFrom: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_periodTo: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_ringGroupDns: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_top: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_skip: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_search: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_filter: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_count: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_select: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_orderby: '<node property>', // (1) define node properties
                DownloadExtensionsStatisticsByRingGroups_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetExtensionStatisticsByGroupData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetExtensionStatisticsByGroupData',
                GetExtensionStatisticsByGroupData_groupNumber: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_periodFrom: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_periodTo: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_callArea: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_top: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_skip: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_search: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_filter: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_count: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_select: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_orderby: '<node property>', // (1) define node properties
                GetExtensionStatisticsByGroupData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadExtensionStatisticsByGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadExtensionStatisticsByGroup',
                DownloadExtensionStatisticsByGroup_groupNumber: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_periodFrom: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_periodTo: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_callArea: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_top: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_skip: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_search: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_filter: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_count: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_select: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_orderby: '<node property>', // (1) define node properties
                DownloadExtensionStatisticsByGroup_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetExtensionStatisticsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetExtensionStatisticsData',
                GetExtensionStatisticsData_periodFrom: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_periodTo: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_extensionFilter: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_callArea: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_top: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_skip: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_search: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_filter: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_count: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_select: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_orderby: '<node property>', // (1) define node properties
                GetExtensionStatisticsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadExtensionStatistics()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadExtensionStatistics',
                DownloadExtensionStatistics_periodFrom: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_periodTo: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_extensionFilter: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_callArea: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_top: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_skip: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_search: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_filter: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_count: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_select: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_orderby: '<node property>', // (1) define node properties
                DownloadExtensionStatistics_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListReportGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListReportGroup',
                ListReportGroup_top: '<node property>', // (1) define node properties
                ListReportGroup_skip: '<node property>', // (1) define node properties
                ListReportGroup_search: '<node property>', // (1) define node properties
                ListReportGroup_filter: '<node property>', // (1) define node properties
                ListReportGroup_count: '<node property>', // (1) define node properties
                ListReportGroup_orderby: '<node property>', // (1) define node properties
                ListReportGroup_select: '<node property>', // (1) define node properties
                ListReportGroup_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetInboundRulesData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetInboundRulesData',
                GetInboundRulesData_top: '<node property>', // (1) define node properties
                GetInboundRulesData_skip: '<node property>', // (1) define node properties
                GetInboundRulesData_search: '<node property>', // (1) define node properties
                GetInboundRulesData_filter: '<node property>', // (1) define node properties
                GetInboundRulesData_count: '<node property>', // (1) define node properties
                GetInboundRulesData_select: '<node property>', // (1) define node properties
                GetInboundRulesData_orderby: '<node property>', // (1) define node properties
                GetInboundRulesData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadInboundRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadInboundRules',
                DownloadInboundRules_top: '<node property>', // (1) define node properties
                DownloadInboundRules_skip: '<node property>', // (1) define node properties
                DownloadInboundRules_search: '<node property>', // (1) define node properties
                DownloadInboundRules_filter: '<node property>', // (1) define node properties
                DownloadInboundRules_count: '<node property>', // (1) define node properties
                DownloadInboundRules_select: '<node property>', // (1) define node properties
                DownloadInboundRules_orderby: '<node property>', // (1) define node properties
                DownloadInboundRules_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueueAgentsChatStatisticsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueueAgentsChatStatisticsData',
                GetQueueAgentsChatStatisticsData_queueDnStr: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_startDt: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_endDt: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_participantType: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_top: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_skip: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_search: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_filter: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_count: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_select: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_orderby: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadQueueAgentsChatStatistics()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadQueueAgentsChatStatistics',
                DownloadQueueAgentsChatStatistics_queueDnStr: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_startDt: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_endDt: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_participantType: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_top: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_skip: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_search: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_filter: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_count: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_select: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_orderby: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatistics_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueueAgentsChatStatisticsTotalsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueueAgentsChatStatisticsTotalsData',
                GetQueueAgentsChatStatisticsTotalsData_queueDnStr: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_startDt: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_endDt: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_participantType: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_top: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_skip: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_search: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_filter: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_count: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_select: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_orderby: '<node property>', // (1) define node properties
                GetQueueAgentsChatStatisticsTotalsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadQueueAgentsChatStatisticsTotals()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadQueueAgentsChatStatisticsTotals',
                DownloadQueueAgentsChatStatisticsTotals_queueDnStr: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_startDt: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_endDt: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_participantType: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_top: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_skip: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_search: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_filter: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_count: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_select: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_orderby: '<node property>', // (1) define node properties
                DownloadQueueAgentsChatStatisticsTotals_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueueAnsweredCallsByWaitTimeData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueueAnsweredCallsByWaitTimeData',
                GetQueueAnsweredCallsByWaitTimeData_queueDnStr: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_startDt: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_endDt: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_answerInterval: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_top: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_skip: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_search: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_filter: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_count: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_select: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_orderby: '<node property>', // (1) define node properties
                GetQueueAnsweredCallsByWaitTimeData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadQueueAnsweredCallsByWaitTime()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadQueueAnsweredCallsByWaitTime',
                DownloadQueueAnsweredCallsByWaitTime_queueDnStr: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_startDt: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_endDt: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_answerInterval: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_clientTimeZone: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_top: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_skip: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_search: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_filter: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_count: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_select: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_orderby: '<node property>', // (1) define node properties
                DownloadQueueAnsweredCallsByWaitTime_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueueAnUnCallsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueueAnUnCallsData',
                GetQueueAnUnCallsData_chartDate: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_chartBy: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_queueDnStr: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_clientTimeZone: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_waitInterval: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_top: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_skip: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_search: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_filter: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_count: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_select: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_orderby: '<node property>', // (1) define node properties
                GetQueueAnUnCallsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadQueueAnUnCallsReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadQueueAnUnCallsReport',
                DownloadQueueAnUnCallsReport_chartDate: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_chartBy: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_queueDnStr: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_clientTimeZone: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_waitInterval: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_top: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_skip: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_search: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_filter: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_count: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_select: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_orderby: '<node property>', // (1) define node properties
                DownloadQueueAnUnCallsReport_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueueCallbacksData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueueCallbacksData',
                GetQueueCallbacksData_queueDnStr: '<node property>', // (1) define node properties
                GetQueueCallbacksData_startDt: '<node property>', // (1) define node properties
                GetQueueCallbacksData_endDt: '<node property>', // (1) define node properties
                GetQueueCallbacksData_top: '<node property>', // (1) define node properties
                GetQueueCallbacksData_skip: '<node property>', // (1) define node properties
                GetQueueCallbacksData_search: '<node property>', // (1) define node properties
                GetQueueCallbacksData_filter: '<node property>', // (1) define node properties
                GetQueueCallbacksData_count: '<node property>', // (1) define node properties
                GetQueueCallbacksData_select: '<node property>', // (1) define node properties
                GetQueueCallbacksData_orderby: '<node property>', // (1) define node properties
                GetQueueCallbacksData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadQueueCallbacks()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadQueueCallbacks',
                DownloadQueueCallbacks_queueDnStr: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_startDt: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_endDt: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_top: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_skip: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_search: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_filter: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_count: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_select: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_orderby: '<node property>', // (1) define node properties
                DownloadQueueCallbacks_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueueChatPerformanceData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueueChatPerformanceData',
                GetQueueChatPerformanceData_queueDnStr: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_startDt: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_endDt: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_participantType: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_top: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_skip: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_search: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_filter: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_count: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_select: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_orderby: '<node property>', // (1) define node properties
                GetQueueChatPerformanceData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadQueueChatPerformance()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadQueueChatPerformance',
                DownloadQueueChatPerformance_queueDnStr: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_startDt: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_endDt: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_participantType: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_top: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_skip: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_search: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_filter: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_count: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_select: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_orderby: '<node property>', // (1) define node properties
                DownloadQueueChatPerformance_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueueFailedCallbacksData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueueFailedCallbacksData',
                GetQueueFailedCallbacksData_queueDnStr: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_startDt: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_endDt: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_top: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_skip: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_search: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_filter: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_count: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_select: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_orderby: '<node property>', // (1) define node properties
                GetQueueFailedCallbacksData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadQueueFailedCallbacks()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadQueueFailedCallbacks',
                DownloadQueueFailedCallbacks_queueDnStr: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_startDt: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_endDt: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_clientTimeZone: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_top: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_skip: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_search: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_filter: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_count: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_select: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_orderby: '<node property>', // (1) define node properties
                DownloadQueueFailedCallbacks_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueuePerformanceOverviewData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueuePerformanceOverviewData',
                GetQueuePerformanceOverviewData_periodFrom: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_periodTo: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_queueDns: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_waitInterval: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_top: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_skip: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_search: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_filter: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_count: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_select: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_orderby: '<node property>', // (1) define node properties
                GetQueuePerformanceOverviewData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadQueuePerformanceOverview()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadQueuePerformanceOverview',
                DownloadQueuePerformanceOverview_periodFrom: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_periodTo: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_queueDns: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_waitInterval: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_top: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_skip: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_search: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_filter: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_count: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_select: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_orderby: '<node property>', // (1) define node properties
                DownloadQueuePerformanceOverview_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetQueuePerformanceTotalsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetQueuePerformanceTotalsData',
                GetQueuePerformanceTotalsData_periodFrom: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_periodTo: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_queueDns: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_waitInterval: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_top: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_skip: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_search: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_filter: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_count: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_select: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_orderby: '<node property>', // (1) define node properties
                GetQueuePerformanceTotalsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadQueuePerformanceTotals()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadQueuePerformanceTotals',
                DownloadQueuePerformanceTotals_periodFrom: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_periodTo: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_queueDns: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_waitInterval: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_top: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_skip: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_search: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_filter: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_count: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_select: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_orderby: '<node property>', // (1) define node properties
                DownloadQueuePerformanceTotals_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetRingGroupStatisticsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetRingGroupStatisticsData',
                GetRingGroupStatisticsData_periodFrom: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_periodTo: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_ringGroupDns: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_top: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_skip: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_search: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_filter: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_count: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_select: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_orderby: '<node property>', // (1) define node properties
                GetRingGroupStatisticsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadRingGroupStatistics()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadRingGroupStatistics',
                DownloadRingGroupStatistics_periodFrom: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_periodTo: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_ringGroupDns: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_top: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_skip: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_search: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_filter: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_count: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_select: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_orderby: '<node property>', // (1) define node properties
                DownloadRingGroupStatistics_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetStatisticSlaData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetStatisticSlaData',
                GetStatisticSlaData_queueDnStr: '<node property>', // (1) define node properties
                GetStatisticSlaData_startDt: '<node property>', // (1) define node properties
                GetStatisticSlaData_endDt: '<node property>', // (1) define node properties
                GetStatisticSlaData_waitInterval: '<node property>', // (1) define node properties
                GetStatisticSlaData_top: '<node property>', // (1) define node properties
                GetStatisticSlaData_skip: '<node property>', // (1) define node properties
                GetStatisticSlaData_search: '<node property>', // (1) define node properties
                GetStatisticSlaData_filter: '<node property>', // (1) define node properties
                GetStatisticSlaData_count: '<node property>', // (1) define node properties
                GetStatisticSlaData_select: '<node property>', // (1) define node properties
                GetStatisticSlaData_orderby: '<node property>', // (1) define node properties
                GetStatisticSlaData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadStatisticSla()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadStatisticSla',
                DownloadStatisticSla_queueDnStr: '<node property>', // (1) define node properties
                DownloadStatisticSla_startDt: '<node property>', // (1) define node properties
                DownloadStatisticSla_endDt: '<node property>', // (1) define node properties
                DownloadStatisticSla_waitInterval: '<node property>', // (1) define node properties
                DownloadStatisticSla_top: '<node property>', // (1) define node properties
                DownloadStatisticSla_skip: '<node property>', // (1) define node properties
                DownloadStatisticSla_search: '<node property>', // (1) define node properties
                DownloadStatisticSla_filter: '<node property>', // (1) define node properties
                DownloadStatisticSla_count: '<node property>', // (1) define node properties
                DownloadStatisticSla_select: '<node property>', // (1) define node properties
                DownloadStatisticSla_orderby: '<node property>', // (1) define node properties
                DownloadStatisticSla_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetTeamQueueGeneralStatisticsData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetTeamQueueGeneralStatisticsData',
                GetTeamQueueGeneralStatisticsData_queueDnStr: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_startDt: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_endDt: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_waitInterval: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_top: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_skip: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_search: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_filter: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_count: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_select: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_orderby: '<node property>', // (1) define node properties
                GetTeamQueueGeneralStatisticsData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadTeamQueueGeneralStatistics()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadTeamQueueGeneralStatistics',
                DownloadTeamQueueGeneralStatistics_queueDnStr: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_startDt: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_endDt: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_waitInterval: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_top: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_skip: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_search: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_filter: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_count: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_select: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_orderby: '<node property>', // (1) define node properties
                DownloadTeamQueueGeneralStatistics_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetUserActivityData()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetUserActivityData',
                GetUserActivityData_chartDate: '<node property>', // (1) define node properties
                GetUserActivityData_chartBy: '<node property>', // (1) define node properties
                GetUserActivityData_includeInternalCalls: '<node property>', // (1) define node properties
                GetUserActivityData_includeQueueCalls: '<node property>', // (1) define node properties
                GetUserActivityData_queueDnStr: '<node property>', // (1) define node properties
                GetUserActivityData_clientTimeZone: '<node property>', // (1) define node properties
                GetUserActivityData_waitInterval: '<node property>', // (1) define node properties
                GetUserActivityData_top: '<node property>', // (1) define node properties
                GetUserActivityData_skip: '<node property>', // (1) define node properties
                GetUserActivityData_search: '<node property>', // (1) define node properties
                GetUserActivityData_filter: '<node property>', // (1) define node properties
                GetUserActivityData_count: '<node property>', // (1) define node properties
                GetUserActivityData_select: '<node property>', // (1) define node properties
                GetUserActivityData_orderby: '<node property>', // (1) define node properties
                GetUserActivityData_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadUserActivityReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadUserActivityReport',
                DownloadUserActivityReport_chartDate: '<node property>', // (1) define node properties
                DownloadUserActivityReport_chartBy: '<node property>', // (1) define node properties
                DownloadUserActivityReport_includeInternalCalls: '<node property>', // (1) define node properties
                DownloadUserActivityReport_includeQueueCalls: '<node property>', // (1) define node properties
                DownloadUserActivityReport_queueDnStr: '<node property>', // (1) define node properties
                DownloadUserActivityReport_clientTimeZone: '<node property>', // (1) define node properties
                DownloadUserActivityReport_waitInterval: '<node property>', // (1) define node properties
                DownloadUserActivityReport_top: '<node property>', // (1) define node properties
                DownloadUserActivityReport_skip: '<node property>', // (1) define node properties
                DownloadUserActivityReport_search: '<node property>', // (1) define node properties
                DownloadUserActivityReport_filter: '<node property>', // (1) define node properties
                DownloadUserActivityReport_count: '<node property>', // (1) define node properties
                DownloadUserActivityReport_select: '<node property>', // (1) define node properties
                DownloadUserActivityReport_orderby: '<node property>', // (1) define node properties
                DownloadUserActivityReport_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListScheduledReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListScheduledReport',
                ListScheduledReport_top: '<node property>', // (1) define node properties
                ListScheduledReport_skip: '<node property>', // (1) define node properties
                ListScheduledReport_search: '<node property>', // (1) define node properties
                ListScheduledReport_filter: '<node property>', // (1) define node properties
                ListScheduledReport_count: '<node property>', // (1) define node properties
                ListScheduledReport_orderby: '<node property>', // (1) define node properties
                ListScheduledReport_select: '<node property>', // (1) define node properties
                ListScheduledReport_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateScheduledReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateScheduledReport',
                CreateScheduledReport_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetScheduledReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetScheduledReport',
                GetScheduledReport_id: '<node property>', // (1) define node properties
                GetScheduledReport_select: '<node property>', // (1) define node properties
                GetScheduledReport_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateScheduledReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateScheduledReport',
                UpdateScheduledReport_id: '<node property>', // (1) define node properties
                UpdateScheduledReport_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteScheduledReport()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteScheduledReport',
                DeleteScheduledReport_id: '<node property>', // (1) define node properties
                DeleteScheduledReport_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListRingGroupMembers()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListRingGroupMembers',
                ListRingGroupMembers_id: '<node property>', // (1) define node properties
                ListRingGroupMembers_top: '<node property>', // (1) define node properties
                ListRingGroupMembers_skip: '<node property>', // (1) define node properties
                ListRingGroupMembers_search: '<node property>', // (1) define node properties
                ListRingGroupMembers_filter: '<node property>', // (1) define node properties
                ListRingGroupMembers_count: '<node property>', // (1) define node properties
                ListRingGroupMembers_orderby: '<node property>', // (1) define node properties
                ListRingGroupMembers_select: '<node property>', // (1) define node properties
                ListRingGroupMembers_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFirstAvailableRingGroupNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFirstAvailableRingGroupNumber',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetRingGroupByNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetRingGroupByNumber',
                GetRingGroupByNumber_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListRingGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListRingGroup',
                ListRingGroup_top: '<node property>', // (1) define node properties
                ListRingGroup_skip: '<node property>', // (1) define node properties
                ListRingGroup_search: '<node property>', // (1) define node properties
                ListRingGroup_filter: '<node property>', // (1) define node properties
                ListRingGroup_count: '<node property>', // (1) define node properties
                ListRingGroup_orderby: '<node property>', // (1) define node properties
                ListRingGroup_select: '<node property>', // (1) define node properties
                ListRingGroup_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateRingGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateRingGroup',
                CreateRingGroup_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetRingGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetRingGroup',
                GetRingGroup_id: '<node property>', // (1) define node properties
                GetRingGroup_select: '<node property>', // (1) define node properties
                GetRingGroup_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateRingGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateRingGroup',
                UpdateRingGroup_id: '<node property>', // (1) define node properties
                UpdateRingGroup_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteRingGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteRingGroup',
                DeleteRingGroup_id: '<node property>', // (1) define node properties
                DeleteRingGroup_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetSbc()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetSbc',
                GetSbc_name: '<node property>', // (1) define node properties
                GetSbc_select: '<node property>', // (1) define node properties
                GetSbc_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateSbc()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateSbc',
                UpdateSbc_name: '<node property>', // (1) define node properties
                UpdateSbc_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteSbc()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteSbc',
                DeleteSbc_name: '<node property>', // (1) define node properties
                DeleteSbc_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListSbc()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListSbc',
                ListSbc_top: '<node property>', // (1) define node properties
                ListSbc_skip: '<node property>', // (1) define node properties
                ListSbc_search: '<node property>', // (1) define node properties
                ListSbc_filter: '<node property>', // (1) define node properties
                ListSbc_count: '<node property>', // (1) define node properties
                ListSbc_orderby: '<node property>', // (1) define node properties
                ListSbc_select: '<node property>', // (1) define node properties
                ListSbc_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateSbc()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateSbc',
                CreateSbc_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetSecureSipSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetSecureSipSettings',
                GetSecureSipSettings_select: '<node property>', // (1) define node properties
                GetSecureSipSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateSecureSipSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateSecureSipSettings',
                UpdateSecureSipSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListSecurityRefreshToken()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListSecurityRefreshToken',
                ListSecurityRefreshToken_top: '<node property>', // (1) define node properties
                ListSecurityRefreshToken_skip: '<node property>', // (1) define node properties
                ListSecurityRefreshToken_search: '<node property>', // (1) define node properties
                ListSecurityRefreshToken_filter: '<node property>', // (1) define node properties
                ListSecurityRefreshToken_count: '<node property>', // (1) define node properties
                ListSecurityRefreshToken_orderby: '<node property>', // (1) define node properties
                ListSecurityRefreshToken_select: '<node property>', // (1) define node properties
                ListSecurityRefreshToken_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle RevokeSecurityToken()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'RevokeSecurityToken',
                RevokeSecurityToken_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListServiceInfo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListServiceInfo',
                ListServiceInfo_top: '<node property>', // (1) define node properties
                ListServiceInfo_skip: '<node property>', // (1) define node properties
                ListServiceInfo_search: '<node property>', // (1) define node properties
                ListServiceInfo_filter: '<node property>', // (1) define node properties
                ListServiceInfo_count: '<node property>', // (1) define node properties
                ListServiceInfo_orderby: '<node property>', // (1) define node properties
                ListServiceInfo_select: '<node property>', // (1) define node properties
                ListServiceInfo_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GarbageCollect()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GarbageCollect',
                GarbageCollect_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Start()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Start',
                Start_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Stop()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Stop',
                Stop_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Enable()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Enable',
                Enable_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Disable()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Disable',
                Disable_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Restart()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Restart',
                Restart_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle RestartAll()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'RestartAll',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle RestartOperatingSystem()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'RestartOperatingSystem',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListSipDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListSipDevice',
                ListSipDevice_top: '<node property>', // (1) define node properties
                ListSipDevice_skip: '<node property>', // (1) define node properties
                ListSipDevice_search: '<node property>', // (1) define node properties
                ListSipDevice_filter: '<node property>', // (1) define node properties
                ListSipDevice_count: '<node property>', // (1) define node properties
                ListSipDevice_orderby: '<node property>', // (1) define node properties
                ListSipDevice_select: '<node property>', // (1) define node properties
                ListSipDevice_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetDirectoryInfo()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetDirectoryInfo',
                GetDirectoryInfo_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetSystemStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetSystemStatus',
                GetSystemStatus_select: '<node property>', // (1) define node properties
                GetSystemStatus_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SystemExtensions()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SystemExtensions',
                SystemExtensions_top: '<node property>', // (1) define node properties
                SystemExtensions_skip: '<node property>', // (1) define node properties
                SystemExtensions_search: '<node property>', // (1) define node properties
                SystemExtensions_filter: '<node property>', // (1) define node properties
                SystemExtensions_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SystemDatabaseInformation()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SystemDatabaseInformation',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetVersionType()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetVersionType',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetChatLogStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetChatLogStatus',
                SetChatLogStatus_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle StartDBMaintenance()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'StartDBMaintenance',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SystemHealthStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SystemHealthStatus',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle APIToken()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'APIToken',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetMultiCompanyMode()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetMultiCompanyMode',
                SetMultiCompanyMode_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListProperty()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListProperty',
                ListProperty_top: '<node property>', // (1) define node properties
                ListProperty_skip: '<node property>', // (1) define node properties
                ListProperty_search: '<node property>', // (1) define node properties
                ListProperty_filter: '<node property>', // (1) define node properties
                ListProperty_count: '<node property>', // (1) define node properties
                ListProperty_orderby: '<node property>', // (1) define node properties
                ListProperty_select: '<node property>', // (1) define node properties
                ListProperty_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateProperty()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateProperty',
                CreateProperty_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetProperty()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetProperty',
                GetProperty_name: '<node property>', // (1) define node properties
                GetProperty_select: '<node property>', // (1) define node properties
                GetProperty_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateProperty()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateProperty',
                UpdateProperty_name: '<node property>', // (1) define node properties
                UpdateProperty_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteProperty()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteProperty',
                DeleteProperty_name: '<node property>', // (1) define node properties
                DeleteProperty_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFirstAvailableTrunkNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFirstAvailableTrunkNumber',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetTrunk()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetTrunk',
                GetTrunk_id: '<node property>', // (1) define node properties
                GetTrunk_select: '<node property>', // (1) define node properties
                GetTrunk_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateTrunk()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateTrunk',
                UpdateTrunk_id: '<node property>', // (1) define node properties
                UpdateTrunk_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteTrunk()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteTrunk',
                DeleteTrunk_id: '<node property>', // (1) define node properties
                DeleteTrunk_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle InitMasterBridge()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'InitMasterBridge',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle InitSlaveBridge()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'InitSlaveBridge',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle InitTrunk()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'InitTrunk',
                InitTrunk_template: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ExportTrunk()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ExportTrunk',
                ExportTrunk_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle RefreshRegistration()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'RefreshRegistration',
                RefreshRegistration_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetRoutes()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetRoutes',
                SetRoutes_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetTrunkByNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetTrunkByNumber',
                GetTrunkByNumber_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListTrunk()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListTrunk',
                ListTrunk_top: '<node property>', // (1) define node properties
                ListTrunk_skip: '<node property>', // (1) define node properties
                ListTrunk_search: '<node property>', // (1) define node properties
                ListTrunk_filter: '<node property>', // (1) define node properties
                ListTrunk_count: '<node property>', // (1) define node properties
                ListTrunk_orderby: '<node property>', // (1) define node properties
                ListTrunk_select: '<node property>', // (1) define node properties
                ListTrunk_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateTrunk()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateTrunk',
                CreateTrunk_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ProvisionTrunk()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ProvisionTrunk',
                ProvisionTrunk_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle TelegramSession()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'TelegramSession',
                TelegramSession_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListTrunkTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListTrunkTemplate',
                ListTrunkTemplate_top: '<node property>', // (1) define node properties
                ListTrunkTemplate_skip: '<node property>', // (1) define node properties
                ListTrunkTemplate_search: '<node property>', // (1) define node properties
                ListTrunkTemplate_filter: '<node property>', // (1) define node properties
                ListTrunkTemplate_count: '<node property>', // (1) define node properties
                ListTrunkTemplate_orderby: '<node property>', // (1) define node properties
                ListTrunkTemplate_select: '<node property>', // (1) define node properties
                ListTrunkTemplate_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateTrunkTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateTrunkTemplate',
                CreateTrunkTemplate_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetTrunkTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetTrunkTemplate',
                GetTrunkTemplate_id: '<node property>', // (1) define node properties
                GetTrunkTemplate_select: '<node property>', // (1) define node properties
                GetTrunkTemplate_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateTrunkTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateTrunkTemplate',
                UpdateTrunkTemplate_id: '<node property>', // (1) define node properties
                UpdateTrunkTemplate_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteTrunkTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteTrunkTemplate',
                DeleteTrunkTemplate_id: '<node property>', // (1) define node properties
                DeleteTrunkTemplate_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetUpdateSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetUpdateSettings',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetUpdateSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetUpdateSettings',
                SetUpdateSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle HasDebianUpgrade()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'HasDebianUpgrade',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpgradeDebian()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpgradeDebian',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetUpdates()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetUpdates',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPromptSetUpdates()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPromptSetUpdates',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetClientCrmUpdates()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetClientCrmUpdates',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetServerCrmUpdates()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetServerCrmUpdates',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle InstallUpdates()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'InstallUpdates',
                InstallUpdates_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetUpdatesStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetUpdatesStats',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle HasDuplicatedEmail()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'HasDuplicatedEmail',
                HasDuplicatedEmail_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetDuplicatedEmails()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetDuplicatedEmails',
                GetDuplicatedEmails_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFirstAvailableExtensionNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFirstAvailableExtensionNumber',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetFirstAvailableHotdeskingNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetFirstAvailableHotdeskingNumber',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SendWelcomeEmail()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SendWelcomeEmail',
                SendWelcomeEmail_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListGroups()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListGroups',
                ListGroups_id: '<node property>', // (1) define node properties
                ListGroups_top: '<node property>', // (1) define node properties
                ListGroups_skip: '<node property>', // (1) define node properties
                ListGroups_search: '<node property>', // (1) define node properties
                ListGroups_filter: '<node property>', // (1) define node properties
                ListGroups_count: '<node property>', // (1) define node properties
                ListGroups_orderby: '<node property>', // (1) define node properties
                ListGroups_select: '<node property>', // (1) define node properties
                ListGroups_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListForwardingProfiles()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListForwardingProfiles',
                ListForwardingProfiles_id: '<node property>', // (1) define node properties
                ListForwardingProfiles_top: '<node property>', // (1) define node properties
                ListForwardingProfiles_skip: '<node property>', // (1) define node properties
                ListForwardingProfiles_search: '<node property>', // (1) define node properties
                ListForwardingProfiles_filter: '<node property>', // (1) define node properties
                ListForwardingProfiles_count: '<node property>', // (1) define node properties
                ListForwardingProfiles_orderby: '<node property>', // (1) define node properties
                ListForwardingProfiles_select: '<node property>', // (1) define node properties
                ListForwardingProfiles_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPhoneSecret()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPhoneSecret',
                GetPhoneSecret_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle Regenerate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'Regenerate',
                Regenerate_id: '<node property>', // (1) define node properties
                Regenerate_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle RegeneratePasswords()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'RegeneratePasswords',
                RegeneratePasswords_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ExportExtensions()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ExportExtensions',
                ExportExtensions_top: '<node property>', // (1) define node properties
                ExportExtensions_skip: '<node property>', // (1) define node properties
                ExportExtensions_search: '<node property>', // (1) define node properties
                ExportExtensions_filter: '<node property>', // (1) define node properties
                ExportExtensions_count: '<node property>', // (1) define node properties
                ExportExtensions_select: '<node property>', // (1) define node properties
                ExportExtensions_orderby: '<node property>', // (1) define node properties
                ExportExtensions_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPhoneRegistrar()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPhoneRegistrar',
                GetPhoneRegistrar_mac: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BulkUpdate()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BulkUpdate',
                BulkUpdate_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetPhoneRegistrars()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetPhoneRegistrars',
                GetPhoneRegistrars_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle RebootPhone()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'RebootPhone',
                RebootPhone_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ReprovisionPhone()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ReprovisionPhone',
                ReprovisionPhone_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpgradePhone()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpgradePhone',
                UpgradePhone_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GenerateProvLink()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GenerateProvLink',
                GenerateProvLink_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetUser()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetUser',
                GetUser_id: '<node property>', // (1) define node properties
                GetUser_select: '<node property>', // (1) define node properties
                GetUser_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateUser()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateUser',
                UpdateUser_id: '<node property>', // (1) define node properties
                UpdateUser_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteUser()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteUser',
                DeleteUser_id: '<node property>', // (1) define node properties
                DeleteUser_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListGreetings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListGreetings',
                ListGreetings_id: '<node property>', // (1) define node properties
                ListGreetings_top: '<node property>', // (1) define node properties
                ListGreetings_skip: '<node property>', // (1) define node properties
                ListGreetings_search: '<node property>', // (1) define node properties
                ListGreetings_filter: '<node property>', // (1) define node properties
                ListGreetings_count: '<node property>', // (1) define node properties
                ListGreetings_orderby: '<node property>', // (1) define node properties
                ListGreetings_select: '<node property>', // (1) define node properties
                ListGreetings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle MakeCallUserRecordGreeting()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'MakeCallUserRecordGreeting',
                MakeCallUserRecordGreeting_id: '<node property>', // (1) define node properties
                MakeCallUserRecordGreeting_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DownloadGreeting()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DownloadGreeting',
                DownloadGreeting_userId: '<node property>', // (1) define node properties
                DownloadGreeting_fileName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BatchDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BatchDelete',
                BatchDelete_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetMonitorStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetMonitorStatus',
                GetMonitorStatus_top: '<node property>', // (1) define node properties
                GetMonitorStatus_skip: '<node property>', // (1) define node properties
                GetMonitorStatus_search: '<node property>', // (1) define node properties
                GetMonitorStatus_filter: '<node property>', // (1) define node properties
                GetMonitorStatus_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle SetMonitorStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'SetMonitorStatus',
                SetMonitorStatus_id: '<node property>', // (1) define node properties
                SetMonitorStatus_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetUserByNumber()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetUserByNumber',
                GetUserByNumber_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListUser()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListUser',
                ListUser_top: '<node property>', // (1) define node properties
                ListUser_skip: '<node property>', // (1) define node properties
                ListUser_search: '<node property>', // (1) define node properties
                ListUser_filter: '<node property>', // (1) define node properties
                ListUser_count: '<node property>', // (1) define node properties
                ListUser_orderby: '<node property>', // (1) define node properties
                ListUser_select: '<node property>', // (1) define node properties
                ListUser_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateUser()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateUser',
                CreateUser_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetTranscribeLanguages()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetTranscribeLanguages',
                GetTranscribeLanguages_top: '<node property>', // (1) define node properties
                GetTranscribeLanguages_skip: '<node property>', // (1) define node properties
                GetTranscribeLanguages_search: '<node property>', // (1) define node properties
                GetTranscribeLanguages_filter: '<node property>', // (1) define node properties
                GetTranscribeLanguages_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetVoicemailSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetVoicemailSettings',
                GetVoicemailSettings_select: '<node property>', // (1) define node properties
                GetVoicemailSettings_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateVoicemailSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateVoicemailSettings',
                UpdateVoicemailSettings_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteAllUserVoicemails()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteAllUserVoicemails',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ListWeblink()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ListWeblink',
                ListWeblink_top: '<node property>', // (1) define node properties
                ListWeblink_skip: '<node property>', // (1) define node properties
                ListWeblink_search: '<node property>', // (1) define node properties
                ListWeblink_filter: '<node property>', // (1) define node properties
                ListWeblink_count: '<node property>', // (1) define node properties
                ListWeblink_orderby: '<node property>', // (1) define node properties
                ListWeblink_select: '<node property>', // (1) define node properties
                ListWeblink_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle CreateWeblink()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'CreateWeblink',
                CreateWeblink_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ValidateLink()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'ValidateLink',
                ValidateLink_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle BulkLinksDelete()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'BulkLinksDelete',
                BulkLinksDelete_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle GetWeblink()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'GetWeblink',
                GetWeblink_link: '<node property>', // (1) define node properties
                GetWeblink_select: '<node property>', // (1) define node properties
                GetWeblink_expand: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle UpdateWeblink()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'UpdateWeblink',
                UpdateWeblink_link: '<node property>', // (1) define node properties
                UpdateWeblink_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle DeleteWeblink()', function (done) {
        var flow = [
            { id: 'n1', type: 'node-red-contrib-3cx-xapi', name: 'node-red-contrib-3cx-xapi',
                method: 'DeleteWeblink',
                DeleteWeblink_link: '<node property>', // (1) define node properties
                DeleteWeblink_ifMatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'node-red-contrib-3cx-xapi-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
});
