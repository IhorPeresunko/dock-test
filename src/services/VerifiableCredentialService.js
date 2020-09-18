import VerifiableCredential from '@docknetwork/sdk/verifiable-credential';

class VerifiableCredentialService {
  create(data) {
    const vc = new VerifiableCredential(data.id);

    // TODO: create interface for each field
    // to make updates independently
    vc.setContext(data.context);
    vc.addSubject(data.subject);
    vc.setStatus(data.status);

    data.type.forEach(type => vc.addType(type));

    return vc;
  }
}

const verifiableCredentialService = new VerifiableCredentialService();

export default verifiableCredentialService;
