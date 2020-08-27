import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {connect} from 'react-redux';

import ControlsComponent from '../components/controls/controls.jsx';
import { firestore } from "../lib/firebase.js";

class Controls extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleGreenFlagClick',
            'handleStopAllClick'
        ]);
    }
    handleGreenFlagClick (e) {
        e.preventDefault();
        if (e.shiftKey) {
            this.props.vm.setTurboMode(!this.props.turbo);
            console.log(this.props);
        } else {
            if (!this.props.isStarted) {
                this.props.vm.start();
            }
            this.props.vm.greenFlag();
            //@author Annie
            const executable = this.props.vm.extensionManager.runtime.executableTargets;
            var project = {}
            for (var i = 0; i < executable.length; i++) {
                var renderedTarget = executable[i];
                if (!renderedTarget.blocks._scripts.length) {
                    continue;
                }
                var blocks = renderedTarget.blocks._blocks;
                var heads = renderedTarget.blocks._scripts;
                let scripts = [];
                let tmp = [];
                for (var j = 0 ; j < heads.length; j++) {
                    let script = []
                    var head = heads[j];
                    var target = blocks[head];
                    while(true) {
                        if ((target.opcode.startsWith("text")) || (target.opcode.startsWith("math"))){
                            break;
                        }
                        script.push(target.opcode);
                        while (target.inputs.SUBSTACK != null) {
                            if (target.next) {
                                tmp.push(target.next);
                            }
                            target = blocks[target.inputs.SUBSTACK.block];
                            script.push(target.opcode);
                        }
                        if (tmp.length) {
                            target = blocks[tmp.shift()];
                            continue;
                        }
                        if (!target.next) {
                            break;
                        }
                        target = blocks[target.next];
                    }
                    if (script.length) {
                        scripts.push(script);
                    }
                }
                project[renderedTarget.sprite.name] = scripts;
            }
            console.log(Date.now(), "click flag", project);
            firestore
            .collection("test")
            .add({
                eventName: "click_flag",
                eventCategory: "scratch_action",
                eventType: "mouse",
                eventAction: "click",
                codeBlocks: JSON.stringify(project),
                sourceIP: "annie",
                created: Date.now(),
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
    handleStopAllClick (e) {
        e.preventDefault();
        this.props.vm.stopAll();
        
        //@author grayson: handleStopEvent
        window.ai.logger(function handleStopEvent(firestore){
            firestore
            .collection("test_grayson")
            .add({
                created: Date.now(),
                eventName: "click_stop",
                eventCategory: "scratch_action",
                eventType: "mouse",
                eventAction: "click",
                sourceIP: "grayson",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        });
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            isStarted, // eslint-disable-line no-unused-vars
            projectRunning,
            turbo,
            ...props
        } = this.props;
        return (
            <ControlsComponent
                {...props}
                active={projectRunning}
                turbo={turbo}
                onGreenFlagClick={this.handleGreenFlagClick}
                onStopAllClick={this.handleStopAllClick}
            />
        );
    }
}

Controls.propTypes = {
    isStarted: PropTypes.bool.isRequired,
    projectRunning: PropTypes.bool.isRequired,
    turbo: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    isStarted: state.scratchGui.vmStatus.running,
    projectRunning: state.scratchGui.vmStatus.running,
    turbo: state.scratchGui.vmStatus.turbo
});
// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
