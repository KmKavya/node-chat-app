const expect=require('expect');

const {isRealString}=require('./validation');

describe('isReatString' ,()=> {
  it('should reject non string values', ()=> {
    var res=isRealString(98);
    expect(res).toBe(false);
  });
  it('should reject  string with only spaces', ()=> {
    var res=isRealString('    ');
    expect(res).toBe(false);
  });
  it('should allow string with non space character values', ()=> {
    var res=isRealString('    KAvya   ');
    expect(res).toBe(true);
  })
});
