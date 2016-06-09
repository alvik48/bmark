'use strict';

/**
 * Small utility for scripts runtime measurement.
 */
class Bmark {

    /**
     * Class constructor
     */
    constructor() {
        this._elapsed = 0;
        this._working = false;
    }

    /**
     * Starts elapsed time incrementing
     * @return {this}
     */
    start() {
        if (this._working) {
            throw new Error('Can\'t start current instance: it is already started');
        }

        this._startTime = Date.now();
        this._working = true;
        return this;
    }

    /**
     * Pauses elapsed time incrementing
     * @return {this}
     */
    stop() {
        if (!this._working) {
            throw new Error('Can\'t stop current instance: it is already stopped');
        }

        this._elapsed += Date.now() - this._startTime;
        this._working = false;
        return this;
    }

    /**
     * Resets elapsed time
     * @return {this}
     */
    reset() {
        if (this._working) {
            throw new Error('Can\'t reset current instance: you must stop it before');
        }

        this._elapsed = 0;
        return this;
    }

    /**
     * Returns elapsed script time
     * @param  {String} format
     * @return {Number|{}}
     */
    getElapsed(format) {
        if (!format || format === 'ms') {
            return this._elapsed;
        } else if (format === 'object') {
            const seconds = Math.floor(this._elapsed / 1000);

            return {
                hours:   Math.floor(seconds / 3600),
                minutes: Math.floor((seconds % 3600) / 60),
                seconds: Math.ceil((seconds % 3600) % 60),
                ms:      this._elapsed - 1000 * seconds
            };
        } else {
            return this._elapsed;
        }
    }
}

module.exports = Bmark;
