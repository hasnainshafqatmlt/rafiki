import invariant from 'fbjs/lib/invariant';


export default function (obj, options={toLowerCase: false}) {
  var ret = {};
  var key;
  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : undefined;
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = options.toLowerCase
      ? key.toLowerCase()
      : key;
  }
  return ret;
}
