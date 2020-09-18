import VerifiablePresentation from '@docknetwork/sdk/verifiable-presentation';

class VerifiablePresentationService {
  create(data) {
    const vp = new VerifiablePresentation(data.id);

    // TODO: create interface for each field
    // to make updates independently
    vp.setContext(data.context);
    vp.setHolder(data.holder);
    vp.addCredential(data.credentials);
    data.type.forEach(type => vp.addType(type));

    return vp;
  }
}

const verifiablePresentationService = new VerifiablePresentationService();

export default verifiablePresentationService;
