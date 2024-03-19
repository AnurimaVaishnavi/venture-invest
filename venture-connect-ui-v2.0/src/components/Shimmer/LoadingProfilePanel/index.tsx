import Skeleton from '../../Skeleton';
import { Container } from './styles';
const LoadingProfilePanel: React.FC = () => {
    return (
        <Container>
        <Skeleton className="bg-skeleton">
        <Skeleton className="avatar-skeleton"/>
        </Skeleton>

        <span>
        <Skeleton className="row-skeleton" />
        <Skeleton className="row-skeleton" />
        <Skeleton className="row-skeleton" />
        <Skeleton className="row-skeleton" />
        <Skeleton className="row-skeleton" />
      </span>
      </Container>
    );

};
export default LoadingProfilePanel;