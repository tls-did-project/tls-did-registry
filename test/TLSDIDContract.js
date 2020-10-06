const TLSDIDContract = artifacts.require('TLSDID');

contract('TLSDIDContract', (accounts) => {
  let tlsdidContract = null;
  before(async () => {
    tlsdidContract = await TLSDIDContract.deployed();
  });

  it('Should add signature to contract', async () => {
    txnReceipt = await tlsdidContract.setSignature('Test', {
      from: accounts[0],
    });
    signature = await tlsdidContract.signature.call();
    assert.equal(signature, 'Test', 'Signature was not added to contract');
  });

  it('Should update signature in contract', async () => {
    await tlsdidContract.setSignature('Test2', { from: accounts[0] });
    signature = await tlsdidContract.signature.call();
    assert.equal(signature, 'Test2', 'Signature was not added to contract');
  });

  it('Should add attribute to contract', async () => {
    await tlsdidContract.addAttribute('TestName', 'TestValue');
    attribute = await tlsdidContract.getAttributes();
    assert.equal(
      attribute[0][0],
      'TestName',
      'Attribute name was not added to contract'
    );
    assert.equal(
      attribute[0][1],
      'TestValue',
      'Attribute value was not added to contract'
    );
  });
});
