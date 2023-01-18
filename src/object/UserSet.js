class UserSet extends Set {
  add(o) {
    if (o.hasOwnProperty('email') && o.hasOwnProperty('phone')) {
      for (let i of this) if (this.deepCompare(o, i)) return false;
      super.add.call(this, o);
      return true;
    }
    return false;
  }

  deepCompare(o, i) {
    return o.email === i.email && o.phone === i.phone;
  }
}

export default UserSet;
